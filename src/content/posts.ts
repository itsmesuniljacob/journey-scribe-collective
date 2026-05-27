import type { Post } from "./types";
import singapore from "@/assets/post-singapore.jpg";
import europe from "@/assets/post-europe.jpg";
import bangalore from "@/assets/post-bangalore.jpg";
import switzerland from "@/assets/post-switzerland.jpg";
import paris from "@/assets/post-paris.jpg";

export const posts: Post[] = [
  {
    slug: "4-days-in-singapore-family-itinerary",
    title: "4 Days in Singapore — A Complete Family Itinerary",
    subtitle: "Gardens, hawker centres, and a kid-approved route through the Lion City",
    excerpt:
      "Everything we did, ate and skipped on four jet-lagged days in Singapore with two children under ten — including the one hawker stall that won them over.",
    category: "Itineraries",
    destination: "Singapore",
    region: "Southeast Asia",
    readMinutes: 12,
    publishedAt: "2025-11-18",
    image: singapore,
    tags: ["family", "asia", "itinerary"],
    body: [
      { type: "p", text: "Singapore is the most forgiving city to travel with kids. It's safe, clean, English-speaking, and small enough that you can change plans on the fly without losing a day to logistics." },
      { type: "h2", text: "Where we stayed" },
      { type: "p", text: "We split the trip between two neighbourhoods to cut down on MRT time: two nights near Bugis (close to the Gardens) and two nights in Sentosa (so the kids could collapse straight into the pool after Universal Studios)." },
      { type: "callout", tone: "tip", title: "Insider tip", text: "Buy a Singapore Tourist Pass on arrival at the airport MRT counter — three days of unlimited transit for less than three single Grab rides." },
      { type: "itinerary", day: 1, title: "Arrival & Gardens by the Bay", items: ["Land at Changi, breakfast at Jewel", "Check in, nap, then dinner at Lau Pa Sat", "Sunset at Supertree Grove (free)", "Garden Rhapsody light show at 7:45 pm"] },
      { type: "itinerary", day: 2, title: "Cultural neighbourhoods", items: ["Kaya toast at Ya Kun, Far East Square", "Walk through Chinatown to Sri Mariamman Temple", "Lunch at Maxwell Food Centre (Tian Tian chicken rice)", "Afternoon at the ArtScience Museum"] },
      { type: "itinerary", day: 3, title: "Sentosa day", items: ["Cable car over to Sentosa", "Universal Studios (arrive 9:30 am sharp)", "Pool & beach club afternoon", "Wings of Time show at 7:40 pm"] },
      { type: "itinerary", day: 4, title: "Slow morning + flight", items: ["Breakfast at Tiong Bahru Bakery", "Singapore Zoo or River Wonders", "Late lunch & airport transfer"] },
      { type: "h2", text: "What we'd skip next time" },
      { type: "proscons", pros: ["Gardens by the Bay (twice)", "Hawker centres for almost every meal", "Sentosa cable car"], cons: ["Merlion (5-minute photo at best)", "Orchard Road shopping with kids", "Anything outdoors between 1–4 pm"] },
      { type: "budget", rows: [
        { label: "Flights (family of 4)", amount: "$3,200" },
        { label: "Hotels (3 nights × 2 properties)", amount: "$1,150" },
        { label: "Food & hawker meals", amount: "$420" },
        { label: "Universal Studios + attractions", amount: "$520" },
        { label: "Transit & Grab", amount: "$180" },
      ], total: "≈ $5,470" },
      { type: "faq", items: [
        { q: "Is 4 days enough?", a: "Yes — Singapore is best as a 3–5 day stop. Past a week the same neighbourhoods start to repeat themselves." },
        { q: "Best month for families?", a: "February to April: drier, slightly cooler, and outside the school-holiday crowds at Universal." },
      ] },
    ],
  },
  {
    slug: "amsterdam-paris-switzerland-10-day-europe-trip",
    title: "Amsterdam + Paris + Switzerland — A 10-Day Europe Trip",
    subtitle: "Three countries, one rail pass, zero rushed mornings",
    excerpt:
      "A slow-paced itinerary built around train travel — how we paced the days, where we stayed, and the booking mistakes we'd avoid next time.",
    category: "Itineraries",
    destination: "Europe",
    region: "Europe",
    readMinutes: 16,
    publishedAt: "2025-10-04",
    image: europe,
    tags: ["europe", "rail", "itinerary"],
    body: [
      { type: "p", text: "Ten days isn't a lot for three countries, but it's enough if you don't try to see everything. We picked one anchor city per country and used the trains as part of the experience rather than just transit." },
      { type: "h2", text: "The route" },
      { type: "list", items: ["Amsterdam — 3 nights", "Paris — 3 nights", "Lauterbrunnen (Swiss Alps) — 3 nights", "Zurich — 1 night before flying out"] },
      { type: "callout", tone: "note", text: "Book Eurail seat reservations the moment your dates are confirmed — they cap out months in advance, especially for the Paris–Basel TGV." },
      { type: "image", src: switzerland, caption: "Misty morning above Lauterbrunnen — the view from our balcony at 6:30 am." },
      { type: "h3", text: "What worked" },
      { type: "list", items: ["Eurail Global Pass, 5 days within 1 month", "Apartment rentals over hotels for laundry + breakfast", "One museum per city — quality over quantity"] },
    ],
  },
  {
    slug: "best-hidden-cafes-in-bangalore",
    title: "Best Hidden Cafes in Bangalore",
    subtitle: "Eight neighbourhood spots locals quietly love",
    excerpt:
      "Forget the chain coffee. These are the small, mostly tucked-away cafes I keep coming back to — for the filter coffee, the slow afternoons, and the playlists.",
    category: "City Guides",
    destination: "Bangalore",
    region: "South Asia",
    readMinutes: 8,
    publishedAt: "2025-09-22",
    image: bangalore,
    tags: ["food", "india", "city-guide"],
    body: [
      { type: "p", text: "Bangalore's coffee culture is older than its tech industry. These eight spots — none of them on the obvious lists — are where I've spent the most afternoons reading and working over the past year." },
      { type: "h2", text: "Indiranagar" },
      { type: "h3", text: "Third Wave Coffee, 12th Main" },
      { type: "p", text: "Filter coffee with single-origin Chikmagalur beans. Sit upstairs by the window for the best light." },
    ],
  },
  {
    slug: "switzerland-budget-breakdown-for-families",
    title: "Switzerland Budget Breakdown for Families",
    subtitle: "What ten days in the Alps actually cost us",
    excerpt:
      "A line-by-line spend for a family of four in Switzerland — including the small choices that saved us hundreds without giving up the cable cars.",
    category: "Budget",
    destination: "Switzerland",
    region: "Europe",
    readMinutes: 10,
    publishedAt: "2025-08-30",
    image: switzerland,
    tags: ["budget", "family", "europe"],
    body: [
      { type: "p", text: "Switzerland has a reputation for being unaffordable. It is expensive, but it's possible to do it well without staying in hostels — here's exactly where our money went." },
      { type: "budget", rows: [
        { label: "Swiss Travel Pass (4 adults equivalent)", amount: "CHF 1,180" },
        { label: "Apartment in Lauterbrunnen, 7 nights", amount: "CHF 1,540" },
        { label: "Groceries & home-cooked dinners", amount: "CHF 420" },
        { label: "Cable cars & gondolas", amount: "CHF 680" },
        { label: "Restaurants (4 dinners)", amount: "CHF 520" },
      ], total: "≈ CHF 4,340" },
    ],
  },
  {
    slug: "best-places-to-stay-near-disneyland-paris",
    title: "Best Places to Stay Near Disneyland Paris",
    subtitle: "On-park vs. Val d'Europe vs. central Paris — honest tradeoffs",
    excerpt:
      "We tried all three. Here's how the mornings, the budget, and the kids' moods actually compared.",
    category: "Stays",
    destination: "Paris",
    region: "Europe",
    readMinutes: 9,
    publishedAt: "2025-07-12",
    image: paris,
    tags: ["family", "stays", "europe"],
    body: [
      { type: "p", text: "Where you sleep around Disneyland Paris shapes your whole trip more than which hotel you pick. Here's the unvarnished comparison." },
    ],
  },
];

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);
