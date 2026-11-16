import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

const DESC = "What Wandering Lens collects, why, who receives it, how long it's kept, and how to exercise your privacy rights.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Wandering Lens" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Privacy Policy — Wandering Lens" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t hairline pt-10">
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

const a = "text-rust underline";

function PrivacyPage() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Last updated 16 November 2026</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Privacy policy</h1>
        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
          Wandering Lens (wanderinglens.in) is a personal travel blog. This page explains what information we
          collect, why, and the choices you have. Questions: <a className={a} href="mailto:notify@wanderinglens.in">notify@wanderinglens.in</a>.
        </p>
        <div className="mt-12 space-y-10">
          <S title="Who is responsible">
            <p>The site's author runs Wandering Lens and is the controller of the personal data described here.</p>
          </S>
          <S title="Visit counting (no cookies)">
            <p>
              Lovable, our hosting platform, counts visits without cookies. It stores nothing on your device,
              doesn't keep IP addresses and doesn't identify you. Lovable collects this data for us.{" "}
              <a className={a} href="https://lovable.dev/privacy" target="_blank" rel="noopener noreferrer">Lovable's privacy policy</a> explains how it handles it.
            </p>
            <p>
              It records the pages visited, where visitors came from, their country, browser, operating system and
              device type, how long they stay, how fast pages load, errors, and which buttons and links are clicked.
              Detailed data is kept for 90 days and daily summaries for a year.
            </p>
            <p>
              Clicks are recorded only once you accept analytics if you're in the EU/EEA, the UK, Switzerland or
              Canada (or we can't tell where you are); elsewhere they're recorded unless you reject. They are never
              recorded if your browser sends Global Privacy Control, even after you accept. Page visits, time on page,
              page speed and errors are recorded for every visitor, without cookies and without identifying anyone.
              Your choice is saved in your browser for up to 12 months.
            </p>
          </S>
          <S title="Google Analytics (cookies)">
            <p>
              We use Google Analytics to understand which stories are read. It sets cookies (such as <code>_ga</code>)
              and sends usage data, including your IP address, to Google. In the EU/EEA, the UK and Switzerland it only
              sets cookies after you accept analytics; elsewhere it runs unless you reject. See{" "}
              <a className={a} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.
            </p>
          </S>
          <S title="Newsletter">
            <p>
              If you subscribe, we store your email address to send you new stories and a welcome email. We keep it
              until you ask us to remove it. Legal basis: your consent.
            </p>
          </S>
          <S title="Trip matcher">
            <p>
              The dates, budget and interests you type into the Trip matcher are sent to an AI service to suggest
              destinations. We don't store them or link them to you.
            </p>
          </S>
          <S title="Stored in your browser">
            <p>
              We save a few things in your browser so the site works: your theme, bookmarks, itineraries you build,
              your cookie choices, and a note so a visit is counted once every 12 hours. These never leave your device.
            </p>
          </S>
          <S title="Your choices and rights">
            <p>
              Change your cookie choice any time via <button type="button" className={a} onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>Cookie settings</button> (also in the footer).
              You can ask to access, correct, or delete your data, object to processing, or withdraw consent by
              emailing us, and you may complain to your local data protection authority.
            </p>
          </S>
          <S title="Changes">
            <p>We'll update this page if anything changes. See also our <Link to="/trust" className={a}>Trust & privacy</Link> page.</p>
          </S>
        </div>
      </article>
    </PageShell>
  );
}
