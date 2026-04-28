import { supabase } from "@/lib/supabase";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const action = searchParams.get("action");
  const key = searchParams.get("key");

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  try {
    // ===== CREATE =====
    if (action === "create") {
      // limit create per IP (basic anti spam)
      const { count } = await supabase
        .from("api_keys")
        .select("*", { count: "exact", head: true })
        .eq("owner_ip", ip);

      if ((count ?? 0) >= 5) {
        return new Response(
          JSON.stringify({ error: "Limit create reached" }),
          { status: 429 }
        );
      }

      const newKey = crypto.randomUUID();

      const { data, error } = await supabase
        .from("api_keys")
        .insert([
          {
            key: newKey,
            owner_ip: ip,
            expires_at: new Date(Date.now() + 60 * 60 * 1000), // 1 jam
            usage_limit: 50,
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

    // ===== CHECK =====
    if (action === "check") {
      if (!key) {
        return new Response(JSON.stringify({ error: "Key required" }), {
          status: 400,
        });
      }

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .eq("key", key)
        .single();

      if (error || !data) {
        return new Response(JSON.stringify({ valid: false }), {
          status: 200,
        });
      }

      // cek expired
      if (new Date(data.expires_at) <= new Date()) {
        return new Response(
          JSON.stringify({ valid: false, reason: "Expired" }),
          { status: 200 }
        );
      }

      // cek aktif
      if (!data.is_active) {
        return new Response(
          JSON.stringify({ valid: false, reason: "Inactive" }),
          { status: 200 }
        );
      }

      // cek limit
      if (data.usage_count >= data.usage_limit) {
        return new Response(
          JSON.stringify({ valid: false, reason: "Limit reached" }),
          { status: 200 }
        );
      }

      // optional: cek IP (biar nggak dishare bebas)
      if (data.owner_ip && data.owner_ip !== ip) {
        return new Response(
          JSON.stringify({ valid: false, reason: "Different IP" }),
          { status: 200 }
        );
      }

      // increment usage
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
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}