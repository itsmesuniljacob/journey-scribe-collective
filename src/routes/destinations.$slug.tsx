import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { getDestinationBySlug } from "@/content/destinations";
import { posts } from "@/content/posts";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const d = getDestinationBySlug(params.slug);
    if (!d) throw notFound();
    return { destination: d };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.destination;
    if (!d) return {};
    return {
      meta: [
        { title: `${d.name} Travel Guide — My Travel Blog` },
        { name: "description", content: d.description },
        { property: "og:image", content: d.image },
      ],
    };
  },
  component: DestinationPage,
});

function DestinationPage() {
  const { destination: d } = Route.useLoaderData();
  const related = posts.filter((p) => p.destination.toLowerCase() === d.name.toLowerCase() || p.region === d.region);
  return (
    <PageShell overlay>
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-black text-white">
        <img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 text-center fade-up">
          <p className="text-[11px] tracked-sm uppercase opacity-90">{d.region} · {d.country}</p>
          <h1 className="mt-4 font-serif italic text-6xl md:text-8xl leading-[0.9]">{d.name}</h1>
          <p className="mt-4 max-w-xl text-base opacity-90">{d.tagline}</p>
        </div>
      </section>

      <section className="border-b hairline">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 lg:px-10">
          <div className="md:col-span-2">
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">About the place</p>
            <p className="mt-4 font-serif italic text-2xl leading-snug">{d.description}</p>
          </div>
          <dl className="border hairline">
            <DT label="Best time" value={d.bestTime} />
            <DT label="Currency" value={d.currency} />
            <DT label="Country" value={d.country} />
            <DT label="Visited" value={d.visited ? "Yes" : "On the list"} />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <h2 className="font-serif italic text-3xl md:text-4xl">Guides from {d.name}{related.length === 0 && d.region}</h2>
        {related.length === 0 ? (
          <p className="mt-6 text-muted-foreground">No guides yet — coming soon.</p>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="overflow-hidden border hairline">
                  <img src={p.image} alt={p.title} loading="lazy" width={1200} height={800}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-4 text-[10px] tracked-sm uppercase text-rust">{p.category}</p>
                <h3 className="mt-1 font-serif text-xl group-hover:text-rust transition-colors">{p.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function DT({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b hairline px-5 py-4 last:border-b-0">
      <dt className="text-[11px] tracked-sm uppercase text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
