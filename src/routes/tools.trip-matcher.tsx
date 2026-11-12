import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { recommendTrips } from "@/lib/trip-planner.functions";
import { fetchDestinations, fetchPosts } from "@/lib/content-queries";

export const Route = createFileRoute("/tools/trip-matcher")({
  component: TripMatcher,
  head: () => ({
    meta: [
      { title: "Trip Matcher — Wandering Lens" },
      { name: "description", content: "Share your dates, budget and interests and get destination and guide picks from Wandering Lens." },
      { property: "og:title", content: "Trip Matcher — Wandering Lens" },
      { property: "og:description", content: "Personal destination and guide recommendations for your next trip." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Result = Awaited<ReturnType<typeof recommendTrips>>;

function TripMatcher() {
  const run = useServerFn(recommendTrips);
  const [form, setForm] = useState({ startDate: "", endDate: "", budget: "", interests: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const { data: destinations = [] } = useQuery({ queryKey: ["tm-dest"], queryFn: fetchDestinations });
  const { data: posts = [] } = useQuery({ queryKey: ["tm-posts"], queryFn: fetchPosts });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      setResult(await run({ data: form }));
    } catch {
      setResult({ intro: "", picks: [], error: "Couldn't build recommendations right now. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Tools</p>
          <h1 className="mt-3 font-serif italic text-5xl md:text-6xl">Trip matcher</h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            Tell me when you can travel, what you'd like to spend and what you love. I'll point you to places from this journal and the guides to read first.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
        <form onSubmit={submit} className="rounded-2xl border hairline bg-card p-6 shadow-sm md:p-10">
          <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
            <label className="block">
              <span className="text-[11px] tracked-sm uppercase text-muted-foreground">From</span>
              <Input type="date" value={form.startDate} onChange={set("startDate")} className="mt-2 h-11" />
            </label>
            <label className="block">
              <span className="text-[11px] tracked-sm uppercase text-muted-foreground">To</span>
              <Input type="date" value={form.endDate} onChange={set("endDate")} className="mt-2 h-11" />
            </label>
            <label className="block md:col-span-2">
              <span className="text-[11px] tracked-sm uppercase text-muted-foreground">Budget</span>
              <Input required maxLength={80} placeholder="e.g. ₹1.5 lakh for two, mid-range" value={form.budget} onChange={set("budget")} className="mt-2 h-11" />
            </label>
            <label className="block md:col-span-2">
              <span className="text-[11px] tracked-sm uppercase text-muted-foreground">Interests</span>
              <Textarea required minLength={2} maxLength={500} rows={4} placeholder="Mountains, street food, slow cafés, a bit of hiking…" value={form.interests} onChange={set("interests")} className="mt-2 resize-none" />
            </label>
          </div>
          <div className="mt-8 flex justify-center md:justify-start">
            <button disabled={loading} className="w-full rounded-full bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity disabled:opacity-60 md:w-auto">
              {loading ? "Finding your places…" : "Recommend destinations"}
            </button>
          </div>
        </form>

        {result?.error && <p className="mt-10 text-sm text-destructive">{result.error}</p>}
        {result && !result.error && (
          <div className="mt-14">
            <p className="font-serif italic text-2xl">{result.intro}</p>
            {result.picks.length === 0 && <p className="mt-4 text-muted-foreground">No close matches yet — try broadening your interests.</p>}
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {result.picks.map((p) => {
                const d = destinations.find((x) => x.slug === p.slug);
                if (!d) return null;
                return (
                  <article key={p.slug} className="border hairline">
                    <img src={d.image} alt={d.name} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                    <div className="p-6">
                      <p className="text-[11px] tracked-sm uppercase text-muted-foreground">{d.country} · Best {d.bestTime}</p>
                      <h2 className="mt-2 font-serif text-3xl">
                        <Link to="/destinations/$slug" params={{ slug: d.slug }} className="hover:text-rust">{d.name}</Link>
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground">{p.reason}</p>
                      {p.guides.length > 0 && (
                        <ul className="mt-4 space-y-1 text-sm">
                          {p.guides.map((g) => {
                            const post = posts.find((x) => x.slug === g);
                            return post ? (
                              <li key={g}><Link to="/blog/$slug" params={{ slug: g }} className="text-rust underline">{post.title}</Link></li>
                            ) : null;
                          })}
                        </ul>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
