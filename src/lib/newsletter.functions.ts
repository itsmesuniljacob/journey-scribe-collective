import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const subscribeSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data) => subscribeSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const { data: result, error } = await supabase.rpc("subscribe_newsletter", {
      p_email: data.email,
    });

    if (error) {
      throw new Error(error.message);
    }

    // The RPC returns a jsonb object
    const parsed = (result as { success: boolean; message?: string; error?: string }) || {
      success: false,
      error: "Unknown error",
    };

    if (!parsed.success) {
      throw new Error(parsed.error || "Subscription failed");
    }

    return { success: true, message: parsed.message || "Subscribed successfully" };
  });
