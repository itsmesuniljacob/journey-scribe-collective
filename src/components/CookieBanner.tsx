import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { needsAnswer, onConsentChange, readChoice, saveChoices } from "@/lib/consent";

const btn = "border px-4 py-2 text-[11px] tracked-sm uppercase transition-colors";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [gpc, setGpc] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGpc((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true);
    void needsAnswer(["analytics"]).then((n) => n && setOpen(true));
    const openSettings = () => {
      setAnalytics(readChoice("analytics") === "granted");
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    const off = onConsentChange(() => setAnalytics(readChoice("analytics") === "granted"));
    return () => {
      window.removeEventListener("open-cookie-settings", openSettings);
      off();
    };
  }, []);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open, settings]);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    setSettings(false);
  };
  const all = (choice: "granted" | "denied") => {
    saveChoices({ analytics: choice });
    close();
  };

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl border hairline bg-background p-5 text-sm shadow-lg outline-none md:inset-x-auto md:right-6 md:bottom-6"
    >
      <p className="font-serif text-xl italic">Your privacy</p>
      {!settings ? (
        <>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            We count visits without cookies. If you accept, we also measure clicks and use analytics cookies to
            understand which stories people read. See our{" "}
            <Link to="/privacy" className="text-rust underline">privacy policy</Link>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => all("granted")} className={`${btn} border-foreground hover:text-rust`}>Accept all</button>
            <button onClick={() => all("denied")} className={`${btn} border-foreground hover:text-rust`}>Reject all</button>
            <button onClick={() => { setAnalytics(readChoice("analytics") === "granted"); setSettings(true); }} className={`${btn} border-transparent underline hover:text-rust`}>Cookie settings</button>
          </div>
        </>
      ) : (
        <>
          {gpc && (
            <p className="mt-2 text-muted-foreground">Your browser's privacy signal (Global Privacy Control) is on, so analytics stays off.</p>
          )}
          <div className="mt-4 flex items-start justify-between gap-4 border-t hairline pt-3">
            <div>
              <p className="font-medium">Necessary</p>
              <p className="text-muted-foreground">Keeps the site working, like your theme choice. Always on.</p>
            </div>
          </div>
          <label className="mt-3 flex items-start justify-between gap-4 border-t hairline pt-3">
            <span>
              <span className="block font-medium">Analytics, provided by Lovable and Google</span>
              <span className="text-muted-foreground">Clicks and reading patterns, so we know what's useful.</span>
            </span>
            <input type="checkbox" className="mt-1 h-4 w-4 accent-current" disabled={gpc} checked={!gpc && analytics} onChange={(e) => setAnalytics(e.target.checked)} />
          </label>
          <div className="mt-4 flex gap-2">
            <button onClick={() => { saveChoices({ analytics: analytics ? "granted" : "denied" }); close(); }} className={`${btn} border-foreground hover:text-rust`}>Save choices</button>
            <button onClick={close} className={`${btn} border-transparent underline hover:text-rust`}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
