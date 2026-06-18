import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust, Security & Privacy — Wandering Lens" },
      {
        name: "description",
        content:
          "How Wandering Lens handles your data, what we collect, who can access it, and how to get in touch about privacy or security questions.",
      },
      { property: "og:title", content: "Trust, Security & Privacy — Wandering Lens" },
      {
        property: "og:description",
        content:
          "How Wandering Lens handles your data, what we collect, who can access it, and how to get in touch about privacy or security questions.",
      },
    ],
  }),
  component: TrustPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t hairline pt-10">
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function TrustPage() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Trust Center</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Trust, security & privacy</h1>
        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
          This page is maintained by the Wandering Lens team to answer common security
          and privacy questions about the site. It describes the controls in place today
          and how we handle the small amount of information visitors share with us. It is
          not an independent certification or audit report.
        </p>

        <div className="mt-12 space-y-10">
          <Section title="What this site is">
            <p>
              Wandering Lens is a personal travel journal — long-form trip stories, route
              guides, and a couple of lightweight planning tools. There are no user
              accounts, no comments, and no public profiles.
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              The only personal information we store is the email address of visitors who
              choose to subscribe to the newsletter. We do not ask for a name, phone
              number, location, or any other detail.
            </p>
            <p>
              The planning tools (trip cost calculator, itinerary builder) run entirely in
              your browser. The inputs you type there are not sent to or stored on our
              servers.
            </p>
          </Section>

          <Section title="How newsletter signups are handled">
            <p>
              When you subscribe, your email is validated and stored in our managed
              database. Writes go through a single validated server function — direct
              public write access to the underlying table is disabled. The subscriber
              list is not readable by visitors and is not shared with third parties.
            </p>
            <p>
              You can ask us to remove your email at any time using the contact address
              below; we will delete it from the list.
            </p>
          </Section>

          <Section title="Hosting & infrastructure">
            <p>
              The site is built and deployed on Lovable, with a managed Postgres database
              and serverless functions provided by the platform. Data is transmitted over
              HTTPS. We rely on the platform&apos;s standard security controls for
              infrastructure-level concerns (patching, network isolation, encryption at
              rest).
            </p>
          </Section>

          <Section title="Cookies & analytics">
            <p>
              The site uses only the cookies strictly required for it to function (for
              example, remembering your light/dark theme preference). We do not run
              third-party advertising trackers.
            </p>
          </Section>

          <Section title="Reporting a security issue">
            <p>
              If you believe you&apos;ve found a security or privacy issue, please email{" "}
              <a
                className="underline underline-offset-4 hover:text-rust"
                href="mailto:xenon.ivybridge@gmail.com"
              >
                xenon.ivybridge@gmail.com
              </a>{" "}
              with a description and steps to reproduce. We&apos;ll acknowledge the report
              and work on a fix.
            </p>
          </Section>

          <Section title="Changes to this page">
            <p>
              This page is editable content and will be updated when our practices change.
              Last reviewed: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}.
            </p>
            <p>
              <Link to="/about" className="underline underline-offset-4 hover:text-rust">
                More about who runs the site →
              </Link>
            </p>
          </Section>
        </div>
      </article>
    </PageShell>
  );
}
