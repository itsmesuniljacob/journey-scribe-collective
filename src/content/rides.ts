import type { Ride } from "./types";
import lehManali from "@/assets/ride-leh-manali.jpg";
import coorg from "@/assets/ride-coorg.jpg";
import gearImg from "@/assets/ride-gear.jpg";
import umingla from "@/assets/umling-la.jpg";
import kla from "@/assets/kla.jpg";
import pangog from "@/assets/lake-pang.jpg";
import hallOfFame from "@/assets/hall-of-fame.jpg";

export const rides: Ride[] = [
  {
    slug: "leh-ladakh-highway-the-long-version",
    title: "Leh-Ladakh Highway — The Long Version",
    tagline: "Ten days, five passes, one slow-burn obsession",
    excerpt:
      "The honest account of riding the Leh-Ladakh Highway end to end — the altitude headaches, the rest days I didn't plan for, and the stretches that genuinely changed how I think about riding.",
    category: "Story",
    region: "Himalayas, India",
    startPoint: "Leh",
    endPoint: "Leh",
    distanceKm: 1100,
    days: 10,
    elevationM: 5328,
    difficulty: "Expert",
    terrain: "High-altitude tarmac, gravel, river crossings",
    bestMonths: "May to October",
    publishedAt: "2025-09-12",
    image: lehManali,
    body: [
      { type: "p", text: "I'd been thinking about this ride for three years before I actually did it. Every motorcycling friend in India has an opinion on Leh-Ladakh — and almost none of them line up. Here's what mine looks like now that I've done it." },
      { type: "h2", text: "The route, day by day" },
      { type: "itinerary", day: 1, title: "Arrival in Leh", items: ["Arrive in Leh by afternoon, rest and acclimatise", 
        "Visit the local market and try some street food",
        "Tour briefing by road captain", "Getting introduced to the bikes",
        "Visting Shanti Stupa"] },
      { type: "image", src: "https://i.pinimg.com/736x/c8/46/6a/c8466a3523aa440bf5d9edd9722ebe8b.jpg", caption: "LEH market" },  
      { type: "p", 
        text: `Reaching Leh from Bangalore is a journey that begins long before you arrive in Ladakh. 
        We choose a connecting flight through Delhi, it is a gradual shift from Bengaluru’s familiar pace to the thin air, wide skies, and rugged landscapes of the Himalayas. 
        The first two days are all about acclimatisation. Don't skip them. The rest of the ride is a mix of tarmac, gravel, and river crossings. Take it slow, take breaks, and enjoy the scenery.` 
      }, 
      { type: "image", src: "https://i.pinimg.com/736x/fc/3d/fc/fc3dfc752682eea89b3de6a19e796174.jpg", caption: "LEH" },  
      { type: "p", 
        text: `The first day of riding is a gentle warm-up, with a loop around Leh and some light riding to get used to the altitude. 
        The next few days are where the real adventure begins — crossing high passes, navigating gravel roads, and soaking in the stunning landscapes. 
        Each day brings its own challenges and rewards, from the adrenaline rush of riding over Khardung La to the serene beauty of Pangong Lake.` 
      },      
      { type: "image", src: "https://images.pexels.com/photos/38087449/pexels-photo-38087449.jpeg", caption: "View from the basecamp" },
      { type: "itinerary", day: 2, title: "Leh Ladakh Bike Tour", items: ["Visit Sangam", "Visit the Magnetic Hill", "Enjoy River rafting at World's Highest River rafting point"] },
//      { type: "callout", tone: "warn", title: "Don't skip the rest day", text: "I tried to do Sarchu → Leh in one shot. Bad call. Add a day at Pang or Tso Kar — your body will thank you and you'll actually see the Morey Plains instead of fighting through them." },
      { type: "p", 
        text: `On Day 2, from Leh, we took a relaxed ride out to Sangam, the point where the Indus and Zanskar rivers meet. 
        It is barely an hour away on the Leh–Srinagar highway, but the scenery changes quickly – the town fades, the road opens up, and suddenly you are looking down at two different rivers folding into one another. 
        We parked the Himalayan 411 near the viewpoint and just stood there for a while, watching rafts drift in and the colours of the water shift in the afternoon light. 
        It was an easy ride, but the kind of stop that quietly becomes one of the highlights of the trip` 
      },
      { type: "image", src: "https://images.unsplash.com/photo-1631441676111-c82a9d111417", caption: "Confluence of Indus(right)and Zanskar(left)" },
      { type: "list", items: [
        "Stand at the viewpoint and clearly see the two rivers meeting, often in different shades (Zanskar muddier, Indus clearer, depending on season).",
        "The confluence of the Indus and Zanskar rivers is a serene spot to pause and take in the landscape.",
        "Try river rafting (Zanskar side, usually Chilling–Sangam route), which takes a few hours and is popular in summer..",
      ] },
      { type: "image", src: "https://i.pinimg.com/736x/c6/13/22/c613228e55a0bcfde9e2411b8e43ea21.jpg", caption: "Magnetic Hill" },
      { type: "callout", tone: "tip", title: "The Magnetic Hill", text: "A curious phenomenon where vehicles appear to roll uphill. It's a fun stop, but don't expect to defy gravity." },
      { type: "itinerary", day: 3, title: "LEH → Nubra Valley", items: ["Khardung La (5,359 m) — highest motorable pass in the world", "Don't be a hero. Take it slow, take breaks, and don't forget to breathe.", "Experience the ride on the highest motorable road in the world.", "Visit the white sand dunes in Hunder"] },
      { type: "image", src: kla, caption: "Khardung La" },
      { type: "p", text: `Day 3 was our move from Leh into Nubra Valley, with the Himalayan 411 loaded up and pointed towards Khardung La. 
        The climb began almost immediately after leaving town, the tarmac snaking above the familiar Leh skyline and slowly trading buildings for bare rock 
        and snow‑streaked ridges. Khardung La itself was cold, windy, and unforgettable – we stopped just long enough for a cup of tea, a few photos, 
        and that quiet moment of realizing we’d ridden our way to one of the world’s highest passes. From there the road dropped sharply towards the Shyok river, 
        the colours softening from harsh browns and whites to greener slopes, villages, and finally the wide open stretches near Hunder. 
        
        By the time we reached our stay close to the famous sand dunes, it felt less like we had changed hotels and more like we had crossed into a 
        different Ladakh altogether.` },
      { type: "callout", tone: "note", title: "Key route facts", text: "Leh → South Pullu → Khardung La → North Pullu → Khardung village → Khalsar → Diskit / Hunder (Nubra Valley)" },
      { type: "image", src: "https://images.pexels.com/photos/24713335/pexels-photo-24713335.jpeg", caption: "Diskit Gompa, overlooking Nubra Valley" },
      { type: "itinerary", day: 4, title: "Nubra Valley → Pangong via Shyok", items: ["Drive to Pangong Lake passing through the Indo-China border", "Rides via Shayok river route", "Dinner and overnight stay at camps. At midnight enjoy the Galaxy views from your camp"] },
      { type: "image", src: pangog, caption: "Solo at Pangong Lake" },
      { type: "p", text: `On Day 4, we rolled out of Hunder, leaving Nubra Valley behind and riding towards Pangong via the Shyok route instead of looping back to Leh.
         We started from Hunder soon after breakfast, fuelled up both the Himalayan 411 and ourselves, and followed the road back to Khalsar before turning off 
         towards Agham. From there the character of the ride changed completely: long, lonely stretches along the Shyok river, sections of smooth tarmac broken 
         by rough gravel, and the occasional water crossing that reminded us we were still in real Himalayan country. Villages grew smaller and farther apart as
          we rode on towards Durbuk and Tangtse, and then, without much warning, the landscape opened up to that first surreal glimpse of Pangong’s blue. 
          It had been a demanding day in the saddle, but rolling into Pangong by evening, with the lake glowing under the high‑altitude light, 
          felt like the perfect reward`},
      { type: "image", src: "https://images.pexels.com/photos/12094542/pexels-photo-12094542.jpeg", caption: "Pangong Lake" },
      { type: "image", src: "https://images.pexels.com/photos/33792550/pexels-photo-33792550.jpeg", caption: "3 idiots" },
      { type: "itinerary", day: 5, title: "Hanle → Umingla → Hanle", items: ["Visit Umling-La, the world's highest motorable road", "Climb Umingla and soak in the summit views before descending back to Hanle", "The last village of India-China Border"] },
      { type: "image", src: umingla, caption: "Umling La" },
      { type: "p", text: `Our next stretch out of Hanle was the most extreme day of the entire trip – a loop to Umling La and back. We left before sunrise, 
        the Himalayan 411’s headlight cutting through the cold, empty roads of Changthang as the sky slowly turned from black to blue.
         The tarmac soon gave way to rougher tracks, patches of sand, and long, rolling plains where it felt like we were riding on the roof of the world
          with almost no one else around. The final climb to Umling La was slow and deliberate, every throttle input careful in the thin air, until the road 
          finally spat us out at a signboard announcing the world’s highest motorable pass. We didn’t linger too long at the top – just enough for a few photos, 
          a quiet congratulations to each other, and a moment to let the altitude sink in – before turning back towards Hanle, chasing the same lonely roads 
          home as the light faded.` },
      { type: "callout", tone: "note", title: "Altitude Discipline", text: "We kept our stops short, drank water even when we didn’t feel thirsty, and avoided running or sudden movements at the top." },
      { type: "itinerary", day: 7, title: "Hanle → Leh", items: ["Tso Kar is a salt lake at 4,580 m. Stunning in the morning light.", "The road is gravel and can be rough. Take it slow.", "Return to Leh by evening, rest and enjoy the town."] },
      { type: "itinerary", day: 8, title: "At Leh", items: ["Rest and recuperate in Leh", "Explore the town and its attractions", "Prepare for the journey back"] },
      { type: "itinerary", day: 9, title: "Return to Bangalore", items: ["Leh to Delhi", "Explore Delhi and return to Bangalore", "Carry lot of memories"] },
      { type: "image", src: "https://images.pexels.com/photos/37839586/pexels-photo-37839586.jpeg", caption: "The beast who took me to places" },
      { type: "h2", text: "What surprised me" },
      { type: "p", text: "The hardest part wasn't the passes. It was Gata Loops — 21 hairpins that climb 470 m and somehow feel like 4,700. The easiest part was Tanglang La, the highest pass, because by then I'd stopped fighting the altitude and started breathing with it." },
    ],
    lessons: [
      "Acclimatise in Leh for 2 nights before starting.",
      "Carry a Diamox prescription. Use it on day 2, not day 4.",
      "Carry water, sunglasses, sunscreen, a light jacket, and keep an eye on winds – weather can change quickly even though the distance is small.",
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
