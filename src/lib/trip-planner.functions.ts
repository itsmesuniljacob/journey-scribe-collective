import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchDestinations, fetchPosts } from "@/lib/content-queries";

const Input = z.object({
  startDate: z.string().max(20).optional().default(""),
  endDate: z.string().max(20).optional().default(""),
  budget: z.string().max(80),
  interests: z.string().min(2).max(500),
});

export interface TripRecommendation {
  slug: string;
  reason: string;
  guides: string[];
}

export const recommendTrips = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<{ intro: string; picks: TripRecommendation[]; error?: string }> => {
    const [destinations, posts] = await Promise.all([fetchDestinations(), fetchPosts()]);
    const catalog = {
      destinations: destinations.map((d) => ({
        slug: d.slug, name: d.name, country: d.country, region: d.region,
        tagline: d.tagline, bestTime: d.bestTime, currency: d.currency,
      })),
      guides: posts.map((p) => ({
        slug: p.slug, title: p.title, destination: p.destination, category: p.category, excerpt: p.excerpt.slice(0, 160),
      })),
    };

    try {
      const { generateResponse } = await import("@lovable.dev/ai-gateway");
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions:
          "You are the trip-matching assistant for the Wandering Lens travel blog. Recommend only destinations and guides from the provided catalog, using their exact slugs. Pick 1-3 destinations that fit the reader's dates (consider best time to visit), budget and interests. For each, give a warm 1-2 sentence reason and up to 3 relevant guide slugs (guides whose destination matches; empty list if none). Reply in JSON.",
        input: [
          {
            role: "user",
            content: `Return JSON. Reader: ${JSON.stringify(data)}\nCatalog: ${JSON.stringify(catalog)}`,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "trip_picks",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["intro", "picks"],
              properties: {
                intro: { type: "string" },
                picks: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["slug", "reason", "guides"],
                    properties: {
                      slug: { type: "string" },
                      reason: { type: "string" },
                      guides: { type: "array", items: { type: "string" } },
                    },
                  },
                },
              },
            },
          },
        },
      });

      let text = "";
      for (const item of (res.output ?? []) as Array<{ type: string; content?: Array<{ type: string; text?: string }> }>) {
        if (item.type !== "message") continue;
        for (const c of item.content ?? []) if (c.type === "output_text" && c.text) text += c.text;
      }
      const parsed = JSON.parse(text) as { intro: string; picks: TripRecommendation[] };
      const destSlugs = new Set(destinations.map((d) => d.slug));
      const postSlugs = new Set(posts.map((p) => p.slug));
      return {
        intro: parsed.intro,
        picks: parsed.picks
          .filter((p) => destSlugs.has(p.slug))
          .map((p) => ({ ...p, guides: p.guides.filter((g) => postSlugs.has(g)) })),
      };
    } catch (err) {
      console.error("recommendTrips failed", err);
      const e = err as { name?: string };
      const msg =
        e?.name === "RateLimitError"
          ? "Lots of trip planning going on right now — please try again in a minute."
          : e?.name === "PaymentRequiredError"
            ? "The trip matcher is resting for now. Please try again later."
            : "Couldn't build recommendations right now. Please try again.";
      return { intro: "", picks: [], error: msg };
    }
  });
