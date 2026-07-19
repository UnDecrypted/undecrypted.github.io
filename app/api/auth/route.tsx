
import { supabase } from "@/lib/supabase";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const action = searchParams.get("action") || "create";
  const script = searchParams.get("script");
  const world = searchParams.get("world");
  const amountParam = searchParams.get("amount");

  // Get client IP address to isolate keys per user/device
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  try {
    // ================= ACTION: CREATE / UPDATE =================
    if (action === "create") {
      if (!script || !world || !amountParam) {
        return new Response(
          JSON.stringify({ error: "Missing required parameters: script, world, amount" }),
          { status: 400 }
        );
      }

      const amount = parseInt(amountParam);
      if (isNaN(amount) || amount <= 0) {
        return new Response(
          JSON.stringify({ error: "Amount must be a positive number" }),
          { status: 400 }
        );
      }

      // Querying the updated "auth_key" table
      const { data: existingKey, error: fetchError } = await supabase
        .from("auth_key")
        .select("*")
        .eq("owner_ip", ip)
        .eq("script_name", script)
        .eq("world_name", world)
        .maybeSingle();

      if (fetchError) {
        return new Response(JSON.stringify({ error: fetchError.message }), { status: 500 });
      }

      // If key exists for this IP/Script/World combo, add the new amount to the old one
      if (existingKey) {
        const newAmount = existingKey.amount + amount;

        const { data: updatedData, error: updateError } = await supabase
          .from("auth_key")
          .update({ amount: newAmount })
          .eq("id", existingKey.id)
          .select()
          .single();

        if (updateError) {
          return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
        }

        return new Response(
          JSON.stringify({ message: "Amount updated", key: updatedData.key, total_amount: updatedData.amount }),
          { status: 200 }
        );
      }

      // Generate completely new UUID if no existing match found
      const newKey = crypto.randomUUID();

      const { data: newData, error: insertError } = await supabase
        .from("auth_key")
        .insert([
          {
            key: newKey,
            owner_ip: ip,
            script_name: script,
            world_name: world,
            amount: amount,
          },
        ])
        .select()
        .single();

      if (insertError) {
        return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
      }

      return new Response(
        JSON.stringify({ message: "Key created", key: newData.key, amount: newData.amount }),
        { status: 200 }
      );
    }

    // ================= ACTION: LIST (CLIENT-SIDED PROTECTION) =================
    if (action === "list") {
      const { data, error } = await supabase
        .from("auth_key")
        .select("key, script_name, world_name, amount")
        .eq("owner_ip", ip);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify(data), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}