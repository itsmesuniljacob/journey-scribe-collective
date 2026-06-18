import type { Ride } from "./types";
import lehManali from "@/assets/ride-leh-manali.jpg";
import coorg from "@/assets/ride-coorg.jpg";
import gearImg from "@/assets/ride-gear.jpg";

export const rides: Ride[] = [
  {
    slug: "leh-manali-highway-the-long-version",
    title: "Leh-Manali Highway — The Long Version",
    tagline: "Eleven days, five passes, one slow-burn obsession",
    excerpt:
      "The honest account of riding the Leh-Manali Highway end to end — the altitude headaches, the rest days I didn't plan for, and the stretches that genuinely changed how I think about riding.",
    category: "Story",
    region: "Himalayas, India",
    startPoint: "Manali",
    endPoint: "Leh",
    distanceKm: 490,
    days: 11,
    elevationM: 5328,
    difficulty: "Expert",
    terrain: "High-altitude tarmac, gravel, river crossings",
    bestMonths: "Late June – Early September",
    publishedAt: "2025-09-12",
    image: lehManali,
    body: [
      { type: "p", text: "I'd been thinking about this ride for three years before I actually did it. Every motorcycling friend in India has an opinion on Leh-Manali — and almost none of them line up. Here's what mine looks like now that I've done it." },
      { type: "h2", text: "The route, day by day" },
      { type: "itinerary", day: 1, title: "Manali → Jispa", items: ["Easy warm-up: ~140 km", "Atal Tunnel cuts out the old Rohtang grind", "Sleep low to acclimatise"] },
      { type: "itinerary", day: 2, title: "Jispa → Sarchu", items: ["Baralacha La (4,890 m) — first real altitude", "Headache by evening, don't push fluids late", "Tented camps; book ahead in season"] },
      { type: "callout", tone: "warn", title: "Don't skip the rest day", text: "I tried to do Sarchu → Leh in one shot. Bad call. Add a day at Pang or Tso Kar — your body will thank you and you'll actually see the Morey Plains instead of fighting through them." },
      { type: "h2", text: "What surprised me" },
      { type: "p", text: "The hardest part wasn't the passes. It was Gata Loops — 21 hairpins that climb 470 m and somehow feel like 4,700. The easiest part was Tanglang La, the highest pass, because by then I'd stopped fighting the altitude and started breathing with it." },
    ],
    lessons: [
      "Acclimatise in Manali for 2 nights before starting north.",
      "Carry a Diamox prescription. Use it on day 2, not day 4.",
      "Fuel: top up at Tandi. The next pump is 365 km away.",
      "Cash > UPI. Signal dies after Keylong.",
    ],
  },
  {
    slug: "coorg-weekend-loop-from-bangalore",
    title: "The Coorg Weekend Loop — A 2-Day Route from Bangalore",
    tagline: "260 km of monsoon greens, coffee stops, and one perfect ghat",
    excerpt:
      "A short, repeatable loop I do 3-4 times a year. Bangalore → Madikeri → Bhagamandala → back, with the exact fuel stops, breakfast joints, and the one stretch worth waking up at 4am for.",
    category: "Route",
    region: "Western Ghats, India",
    startPoint: "Bangalore",
    endPoint: "Bangalore",
    distanceKm: 520,
    days: 2,
    elevationM: 1525,
    difficulty: "Moderate",
    terrain: "Highway + twisty ghat sections, wet during monsoon",
    bestMonths: "June – September (for mist) / November – February (for grip)",
    publishedAt: "2025-10-21",
    image: coorg,
    body: [
      { type: "p", text: "If someone has a weekend and a bike, this is the ride I send them on. It's the right amount of distance, the right kind of corners, and the kind of coffee at the end that justifies the soreness." },
      { type: "h2", text: "Saturday: Bangalore → Madikeri (260 km)" },
      { type: "list", items: [
        "Leave by 5:30am. Mysore Road is a different animal after 8am.",
        "Breakfast at Maddur Tiffanys — Maddur vada, no debate.",
        "Fuel at Hunsur. Last reliable HP before the ghat.",
        "Pick the Hunsur–Madikeri ghat over Mysore–Madikeri. Quieter, twistier, better surface."
      ] },
      { type: "h2", text: "Sunday: Madikeri → Bhagamandala → Bangalore" },
      { type: "p", text: "Bhagamandala is 36 km of pure ghat from Madikeri. Do it before 9am — empty road, full mist, and the kind of grip wet basalt gives you when no one's pushing past." },
      { type: "callout", tone: "tip", title: "The one stretch", text: "Km 18-26 on the Bhagamandala road. Eight kilometres of third-gear sweepers under a tunnel of trees. Worth the entire weekend." },
    ],
    lessons: [
      "Carry rain gear June–September. Non-negotiable.",
      "Mud-Terrain or dual-sport tyres are overkill. Good road rubber + sense is enough.",
      "Don't ride the ghat after dark. Cattle, pedestrians, no streetlights.",
    ],
  },
  {
    slug: "what-i-actually-carry-on-a-long-ride",
    title: "What I Actually Carry on a Long Ride",
    tagline: "Five years of packing lists, distilled into one I'd defend",
    excerpt:
      "Not a 'best of' list. The exact gear I take on every multi-day ride, what I stopped carrying, and the three things I wish I'd bought earlier.",
    category: "Gear",
    region: "Anywhere",
    startPoint: "—",
    endPoint: "—",
    distanceKm: 0,
    days: 0,
    difficulty: "Easy",
    terrain: "—",
    bestMonths: "Year-round",
    publishedAt: "2025-11-04",
    image: gearImg,
    body: [
      { type: "p", text: "Every rider I know over-packs the first long trip and under-packs the second. Here's where I've landed after a few thousand kilometres of trial and (mostly) error." },
      { type: "h2", text: "On the body" },
      { type: "list", items: [
        "ABS-certified full-face helmet with a Pinlock anti-fog insert.",
        "Mesh riding jacket with CE level-2 armour. Add a thermal liner for the Himalayas.",
        "Knee guards under riding pants. Not over.",
        "Short cuff summer gloves + long cuff winter gloves. Both, always.",
        "Waterproof riding boots above the ankle. No exceptions.",
      ] },
      { type: "h2", text: "On the bike" },
      { type: "list", items: [
        "Tank bag with map sleeve — phone goes here, not on the bars.",
        "50L tail bag, dry-bag style. Roll closure, not zip.",
        "Tubeless puncture kit + 12V mini compressor.",
        "Two bungee cords. Always two.",
      ] },
      { type: "callout", tone: "note", title: "What I stopped carrying", text: "GoPro chest mount (never used it), spare clutch cable (modern cables don't snap like they used to), and a tent (I'd rather pay ₹800 for a homestay and sleep)." },
    ],
    lessons: [
      "Buy the helmet you'd want in a crash, not the one that matches the bike.",
      "Cheap luggage will fail at the worst moment. Pay once.",
      "Earplugs. Seriously. Every ride over 200 km.",
    ],
  },
];

export const getRideBySlug = (slug: string) => rides.find((r) => r.slug === slug);
