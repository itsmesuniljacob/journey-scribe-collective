import type { Ride } from "./types";
import lehManali from "@/assets/ride-leh-manali.jpg";
import coorg from "@/assets/ride-coorg.jpg";
import gearImg from "@/assets/ride-gear.jpg";

export const rides: Ride[] = [
  {
    slug: "leh-ladakh-highway-the-long-version",
    title: "Leh-Ladakh Highway — The Long Version",
    tagline: "Eleven days, five passes, one slow-burn obsession",
    excerpt:
      "The honest account of riding the Leh-Ladakh Highway end to end — the altitude headaches, the rest days I didn't plan for, and the stretches that genuinely changed how I think about riding.",
    category: "Story",
    region: "Himalayas, India",
    startPoint: "Leh",
    endPoint: "Leh",
    distanceKm: 1100,
    days: 11,
    elevationM: 5328,
    difficulty: "Expert",
    terrain: "High-altitude tarmac, gravel, river crossings",
    bestMonths: "Late June – Early September",
    publishedAt: "2025-09-12",
    image: lehManali,
    body: [
      { type: "p", text: "I'd been thinking about this ride for three years before I actually did it. Every motorcycling friend in India has an opinion on Leh-Ladakh — and almost none of them line up. Here's what mine looks like now that I've done it." },
      { type: "h2", text: "The route, day by day" },
      { type: "itinerary", day: 1, title: "Acclimatisation", items: ["Easy warm-up: ~60 km", "Arrival in Leh, In and around Leh", "Sleep low to acclimatise"] },
      { type: "itinerary", day: 2, title: "Leh → Nubra Valley", items: ["Ride along the Leh-Ladakh Highway", "Route via Khardung La", "Different Terrains"] },
//      { type: "callout", tone: "warn", title: "Don't skip the rest day", text: "I tried to do Sarchu → Leh in one shot. Bad call. Add a day at Pang or Tso Kar — your body will thank you and you'll actually see the Morey Plains instead of fighting through them." },
      { type: "itinerary", day: 4, title: "Nubra Valley → Pangong", items: ["Khardung La (5,359 m) — highest motorable pass in the world", "Don't be a hero. Take it slow, take breaks, and don't forget to breathe.", "Pang is a tiny village with a few homestays. Book ahead."] },
      { type: "itinerary", day: 5, title: "Pangong → Hanle", items: ["Chang La (5,360 m) — the most scenic pass", "The descent into Sarchu is a gravel riverbed. Take it easy.", "Sarchu has tents and a few homestays. Book ahead."] },
      { type: "itinerary", day: 6, title: "Hanle → Umingla → Hanle", items: ["Gata Loops — 21 hairpins that climb 470 m in just 9 km", "Climb Umingla and soak in the summit views before descending back to Hanle", "Arrive in Leh by evening, celebrate with thukpa and momos"] },
      { type: "itinerary", day: 7, title: "Hanle → Leh", items: ["Tso Kar is a salt lake at 4,580 m. Stunning in the morning light.", "The road is gravel and can be rough. Take it slow.", "Return to Leh by evening, rest and enjoy the town."] },
      { type: "itinerary", day: 8, title: "Return to Bangalore", items: ["A long day, but the views of Pangong Lake are worth it.", "The road is tarmac but can be busy. Start early.", "Return to Leh by evening, rest and enjoy the town."] },
      { type: "h2", text: "What surprised me" },
      { type: "p", text: "The hardest part wasn't the passes. It was Gata Loops — 21 hairpins that climb 470 m and somehow feel like 4,700. The easiest part was Tanglang La, the highest pass, because by then I'd stopped fighting the altitude and started breathing with it." },
    ],
    lessons: [
      "Acclimatise in Leh for 2 nights before starting.",
      "Carry a Diamox prescription. Use it on day 2, not day 4.",
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
