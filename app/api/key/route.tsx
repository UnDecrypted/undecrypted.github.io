import { supabase } from "@/lib/supabase";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const action = searchParams.get("action");
  const key = searchParams.get("key");
  const plan = searchParams.get("plan") || "free";

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  try {
    // ================= CREATE =================
    if (action === "create") {
      // ===== FREE =====
      if (plan === "free") {
        const { count } = await supabase
          .from("api_keys")
          .select("*", { count: "exact", head: true })
          .eq("owner_ip", ip);

        if ((count ?? 0) >= 24) {
          return new Response(
            JSON.stringify({ error: "Limit create reached" }),
            { status: 429 }
          );
        }
      }

      // ===== ADMIN CHECK =====
      if (plan === "premium") {
        const adminKey = req.headers.get("x-admin-key");

        if (adminKey !== process.env.ADMIN_SECRET) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401 }
          );
        }
      }

      let hours = 1;
      let usageLimit = 50;

      if (plan === "premium") {
        const days = parseInt(searchParams.get("days") || "7");
        hours = 24 * days;
        usageLimit = 1000 * days;
      }

      const newKey = crypto.randomUUID();

      const { data, error } = await supabase
        .from("api_keys")
        .insert([
          {
            key: newKey,
            owner_ip: ip,
            expires_at: new Date(Date.now() + hours * 3600000),
            usage_limit: usageLimit,
            usage_count: 0,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      return new Response(JSON.stringify({ key: data.key }), {
        status: 200,
      });
    }

    // ================= LIST (ADMIN) =================
    if (action === "list") {
      const adminKey = req.headers.get("x-admin-key");

      if (adminKey !== process.env.ADMIN_SECRET) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401 }
        );
      }

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      const now = new Date();

      const formatted = data.map((k) => {
        const expire = new Date(k.expires_at);
        const diff = expire.getTime() - now.getTime();

        return {
          id: k.id,
          key: k.key,
          usage: k.usage_count,
          limit: k.usage_limit,
          remaining: k.usage_limit - k.usage_count,
          days_left: Math.max(0, Math.floor(diff / 86400000)),
          is_active: k.is_active,
        };
      });

      return new Response(JSON.stringify(formatted), { status: 200 });
    }

    // ================= DELETE =================
    if (action === "delete") {
      const adminKey = req.headers.get("x-admin-key");

      if (adminKey !== process.env.ADMIN_SECRET) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401 }
        );
      }

      if (!key) {
        return new Response(
          JSON.stringify({ error: "Key required" }),
          { status: 400 }
        );
      }

      await supabase.from("api_keys").delete().eq("key", key);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      });
    }

    // ================= CHECK =================
    if (action === "check") {
      if (!key) {
        return new Response(JSON.stringify({ error: "Key required" }), {
          status: 400,
        });
      }

      const { data } = await supabase
        .from("api_keys")
        .select("*")
        .eq("key", key)
        .single();

      if (!data) {
        return new Response(JSON.stringify({ valid: false }), {
          status: 200,
        });
      }

      if (new Date(data.expires_at) <= new Date()) {
        return new Response(
          JSON.stringify({ valid: false, reason: "Expired" }),
          { status: 200 }
        );
      }

      if (!data.is_active) {
        return new Response(
          JSON.stringify({ valid: false, reason: "Inactive" }),
          { status: 200 }
        );
      }

      if (data.usage_count >= data.usage_limit) {
        return new Response(
          JSON.stringify({ valid: false, reason: "Limit reached" }),
          { status: 200 }
        );
      }

      await supabase
        .from("api_keys")
        .update({
          usage_count: data.usage_count + 1,
        })
        .eq("id", data.id);

      return new Response(
        JSON.stringify({
          valid: true,
          remaining: data.usage_limit - (data.usage_count + 1),
        }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}