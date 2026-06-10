import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/layout/PageShell";
import authorPortrait from "@/assets/author-portrait.jpg";
import { fetchDestinations, contentKeys } from "@/lib/content-queries";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — My Travel Blog" },
      { name: "description", content: "About Maya and the story behind My Travel Blog." },
    ],
  }),
});

function AboutPage() {
  const { data: destinations = [] } = useQuery({
    queryKey: contentKeys.destinations,
    queryFn: fetchDestinations,
  });
  const visited = destinations.filter((d) => d.visited).length;
  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 lg:px-10 lg:py-28">
          {/* <div className="border hairline">
            <img src={authorPortrait} alt="Maya" width={1024} height={1280} className="aspect-[4/5] w-full object-cover grayscale" />
          </div> */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">About</p>
            <h1 className="mt-4 font-serif italic text-5xl md:text-6xl leading-[0.95]">I'm Sunil.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Writer, slow-traveler, and the person behind every word on this site. I've visited {visited} countries —
              not all at once, and rarely for less than a month at a time.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Whether it's wandering through the charming streets of a European city, discovering hidden cafés in
              Southeast Asia, chasing waterfalls in the Western Ghats, or riding my motorcycle across winding mountain
              roads, I'm always looking for experiences that go beyond the typical tourist trail.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Through this blog, I share detailed travel guides, itineraries, road trip stories, motorcycle adventures,
              practical travel tips, and honest experiences from the places I visit. My goal is simple: to help fellow
              travelers explore more confidently, travel more meaningfully, and create unforgettable memories along the
              way. When I'm not planning my next journey, you'll probably find me researching destinations, mapping out
              scenic riding routes, or capturing moments that inspire the next story you'll read here.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b hairline">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">By the numbers</p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            <Stat n={String(visited)} label="Countries" />
            <Stat n="4" label="Years on the road" />
            <Stat n={`${destinations.length}+`} label="Cities written about" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <h2 className="font-serif italic text-3xl md:text-4xl">A note on how I write</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Every guide here is written after the trip — usually a few weeks later, once the small disappointments and the
          late-night highlights have settled into something honest. No press trips, no comped stays, no sponsored
          sections inside posts.
        </p>
      </section>
    </PageShell>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-serif italic text-6xl text-rust">{n}</p>
      <p className="mt-2 text-[11px] tracked-sm uppercase text-muted-foreground">{label}</p>
    </div>
  );
}
