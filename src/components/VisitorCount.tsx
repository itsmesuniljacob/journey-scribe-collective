import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "wl:visit-recorded";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      let increment = true;
      try {
        const last = window.localStorage.getItem(STORAGE_KEY);
        // count once per browser per 12 hours
        if (last && Date.now() - Number(last) < 12 * 60 * 60 * 1000) increment = false;
        if (increment) window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {
        // localStorage unavailable — just read
        increment = false;
      }

      const { data, error } = await supabase.rpc("record_site_visit", {
        p_increment: increment,
      });
      if (!cancelled && !error && typeof data === "number") setCount(data);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return <p>{count.toLocaleString()} visits</p>;
}
