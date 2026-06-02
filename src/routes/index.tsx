import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-landscape.jpg";
import { PageShell } from "@/components/layout/PageShell";
import { posts as localPosts } from "@/content/posts";
import { destinations as localDestinations } from "@/content/destinations";
import authorPortrait from "@/assets/author-portrait.jpg";
import { toast } from "sonner";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { contentKeys, fetchPosts, fetchDestinations } from "@/lib/content-queries";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <PageShell overlay>
      <Hero />
      <LatestStories />
      <DestinationsStrip />
      <AboutBlock />
      <Newsletter />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black text-white">
      <img
        src={heroImg}
        alt="A dramatic rock butte at dawn beneath a soft pastel sky"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center fade-up">
        <h1 className="font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tight">
          my travel blog
        </h1>
        <p className="mt-6 text-[11px] tracked-sm uppercase font-medium opacity-90">
          Travel Diary &nbsp;·&nbsp; Slow Guides
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <span className="text-[10px] tracked-sm uppercase opacity-80">Scroll</span>
      </div>
    </section>
  );
}

function LatestStories() {
  const { data: posts = localPosts } = useQuery({
    queryKey: contentKeys.posts,
    queryFn: fetchPosts,
    initialData: localPosts,
  });
  const [feature, ...rest] = posts;
  const others = rest.slice(0, 4);
  return (
    <section className="border-t hairline bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Latest stories</p>
            <h2 className="mt-3 font-serif italic text-4xl md:text-5xl">From the road</h2>
          </div>
          <Link to="/blog" className="hidden md:inline-block border-b border-foreground pb-1 text-[11px] tracked-sm uppercase hover:text-rust hover:border-rust">
            All guides →
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Feature */}
          <Link to="/blog/$slug" params={{ slug: feature.slug }} className="group lg:col-span-7">
            <div className="overflow-hidden border hairline">
              <img
                src={feature.image}
                alt={feature.title}
                loading="lazy"
                width={1600}
                height={1067}
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-6">
              <p className="text-[11px] tracked-sm uppercase text-rust">{feature.category} · {feature.destination}</p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl leading-tight group-hover:text-rust transition-colors">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
                {feature.excerpt}
              </p>
              <p className="mt-4 text-[11px] tracked-sm uppercase text-muted-foreground">
                {feature.readMinutes} min read
              </p>
            </div>
          </Link>

          {/* Secondary */}
          <div className="grid gap-10 lg:col-span-5">
            {others.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group grid grid-cols-5 gap-5">
                <div className="col-span-2 overflow-hidden border hairline">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={534}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="col-span-3">
                  <p className="text-[10px] tracked-sm uppercase text-rust">{p.category}</p>
                  <h4 className="mt-2 font-serif text-lg leading-snug group-hover:text-rust transition-colors">{p.title}</h4>
                  <p className="mt-2 text-[11px] tracked-sm uppercase text-muted-foreground">{p.readMinutes} min</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 md:hidden">
          <Link to="/blog" className="border-b border-foreground pb-1 text-[11px] tracked-sm uppercase">All guides →</Link>
        </div>
      </div>
    </section>
  );
}

function DestinationsStrip() {
  const { data: destinations = localDestinations } = useQuery({
    queryKey: contentKeys.destinations,
    queryFn: fetchDestinations,
    initialData: localDestinations,
  });
  return (
    <section className="border-t hairline bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Destinations</p>
            <h2 className="mt-3 font-serif italic text-4xl md:text-5xl">Places I keep returning to</h2>
          </div>
          <Link to="/destinations" className="hidden md:inline-block border-b border-foreground pb-1 text-[11px] tracked-sm uppercase hover:text-rust hover:border-rust">
            See all →
          </Link>
        </div>
        <div className="-mx-6 overflow-x-auto px-6 lg:-mx-10 lg:px-10">
          <div className="flex min-w-max gap-6">
            {destinations.slice(0, 6).map((d) => (
              <Link key={d.slug} to="/destinations/$slug" params={{ slug: d.slug }} className="group block w-[260px] shrink-0">
                <div className="overflow-hidden border hairline">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    width={520}
                    height={650}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-[10px] tracked-sm uppercase text-muted-foreground">{d.region}</p>
                  <h3 className="mt-1 font-serif italic text-2xl">{d.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutBlock() {
  return (
    <section className="border-t hairline bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
        <div className="border hairline">
          <img src={authorPortrait} alt="Portrait of the author" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover grayscale" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">About the author</p>
          <h2 className="mt-4 font-serif italic text-4xl md:text-5xl leading-tight">
            Hi, I'm Maya — I write the long version of the trip.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            I've spent the last eight years working remotely while travelling slowly through 38 countries — mostly with kids in tow. This blog is the version of the guidebook I always wished existed: less ten-things-to-do, more here's-exactly-how-it-felt.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <Link to="/about" className="border-b border-foreground pb-1 text-[11px] tracked-sm uppercase hover:text-rust hover:border-rust">
              Read my story →
            </Link>
            <span className="text-[11px] tracked-sm uppercase text-muted-foreground">38 countries · 8 years</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="border-t hairline bg-rust text-cream">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
        <p className="text-[11px] tracked-sm uppercase opacity-80">Letters from the road</p>
        <h2 className="mt-4 font-serif italic text-4xl md:text-5xl">A slow newsletter, once a month.</h2>
        <p className="mt-4 text-base opacity-90">
          A short note from wherever I am, plus the one guide worth reading this month. No spam, no affiliate noise.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            toast.success("You're in. Watch for the next letter.");
            setEmail("");
          }}
          className="mx-auto mt-8 flex max-w-lg items-center border-b border-cream/60 focus-within:border-cream"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent py-3 text-sm placeholder:text-cream/60 focus:outline-none"
          />
          <button type="submit" className="ml-4 text-[11px] tracked-sm uppercase hover:opacity-80">
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
}
