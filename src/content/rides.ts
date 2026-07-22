import type { Ride } from "./types";
import lehManali from "@/assets/ride-leh-manali.jpg";
import sakleshpur from "@/assets/sakleshpur.jpg";
import gearImg from "@/assets/ride-gear.jpg";
import umingla from "@/assets/umling-la.jpg";
import kla from "@/assets/kla.jpg";
import pangog from "@/assets/lake-pang.jpg";
import bridgeOne from "@/assets/bridge-one.jpg";
import sceneryOne from "@/assets/scenery-one.jpg";
import rideShettihalli01 from "@/assets/ride-shettihalli-01.jpg";
import rideShettihalli02 from "@/assets/ride-shettihalli-02.jpg";
import rideShettihalli03 from "@/assets/ride-shettihalli-03.jpg";

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
      {
        type: "p",
        text: "I'd been thinking about this ride for three years before I actually did it. Every motorcycling friend in India has an opinion on Leh-Ladakh — and almost none of them line up. Here's what mine looks like now that I've done it.",
      },
      { type: "h2", text: "The route, day by day" },
      {
        type: "itinerary",
        day: 1,
        title: "Arrival in Leh",
        items: [
          "Arrive in Leh by afternoon, rest and acclimatise",
          "Visit the local market and try some street food",
          "Tour briefing by road captain",
          "Getting introduced to the bikes",
          "Visting Shanti Stupa",
        ],
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/c8/46/6a/c8466a3523aa440bf5d9edd9722ebe8b.jpg",
        caption: "LEH market",
      },
      {
        type: "p",
        text: `Reaching Leh from Bangalore is a journey that begins long before you arrive in Ladakh. 
        We choose a connecting flight through Delhi, it is a gradual shift from Bengaluru’s familiar pace to the thin air, wide skies, and rugged landscapes of the Himalayas. 
        The first two days are all about acclimatisation. Don't skip them. The rest of the ride is a mix of tarmac, gravel, and river crossings. Take it slow, take breaks, and enjoy the scenery.`,
      },
      { type: "image", src: "https://i.pinimg.com/736x/fc/3d/fc/fc3dfc752682eea89b3de6a19e796174.jpg", caption: "LEH" },
      {
        type: "p",
        text: `The first day of riding is a gentle warm-up, with a loop around Leh and some light riding to get used to the altitude. 
        The next few days are where the real adventure begins — crossing high passes, navigating gravel roads, and soaking in the stunning landscapes. 
        Each day brings its own challenges and rewards, from the adrenaline rush of riding over Khardung La to the serene beauty of Pangong Lake.`,
      },
      {
        type: "image",
        src: "https://images.pexels.com/photos/38087449/pexels-photo-38087449.jpeg",
        caption: "View from the basecamp",
      },
      {
        type: "itinerary",
        day: 2,
        title: "Leh Ladakh Bike Tour",
        items: [
          "Visit Sangam",
          "Visit the Magnetic Hill",
          "Enjoy River rafting at World's Highest River rafting point",
        ],
      },
      //      { type: "callout", tone: "warn", title: "Don't skip the rest day", text: "I tried to do Sarchu → Leh in one shot. Bad call. Add a day at Pang or Tso Kar — your body will thank you and you'll actually see the Morey Plains instead of fighting through them." },
      {
        type: "p",
        text: `On Day 2, from Leh, we took a relaxed ride out to Sangam, the point where the Indus and Zanskar rivers meet. 
        It is barely an hour away on the Leh–Srinagar highway, but the scenery changes quickly – the town fades, the road opens up, and suddenly you are looking down at two different rivers folding into one another. 
        We parked the Himalayan 411 near the viewpoint and just stood there for a while, watching rafts drift in and the colours of the water shift in the afternoon light. 
        It was an easy ride, but the kind of stop that quietly becomes one of the highlights of the trip`,
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1631441676111-c82a9d111417",
        caption: "Confluence of Indus(right)and Zanskar(left)",
      },
      {
        type: "list",
        items: [
          "Stand at the viewpoint and clearly see the two rivers meeting, often in different shades (Zanskar muddier, Indus clearer, depending on season).",
          "The confluence of the Indus and Zanskar rivers is a serene spot to pause and take in the landscape.",
          "Try river rafting (Zanskar side, usually Chilling–Sangam route), which takes a few hours and is popular in summer..",
        ],
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/c6/13/22/c613228e55a0bcfde9e2411b8e43ea21.jpg",
        caption: "Magnetic Hill",
      },
      {
        type: "callout",
        tone: "tip",
        title: "The Magnetic Hill",
        text: "A curious phenomenon where vehicles appear to roll uphill. It's a fun stop, but don't expect to defy gravity.",
      },
      {
        type: "itinerary",
        day: 3,
        title: "LEH → Nubra Valley",
        items: [
          "Khardung La (5,359 m) — highest motorable pass in the world",
          "Don't be a hero. Take it slow, take breaks, and don't forget to breathe.",
          "Experience the ride on the highest motorable road in the world.",
          "Visit the white sand dunes in Hunder",
        ],
      },
      { type: "image", src: kla, caption: "Khardung La" },
      {
        type: "p",
        text: `Day 3 was our move from Leh into Nubra Valley, with the Himalayan 411 loaded up and pointed towards Khardung La. 
        The climb began almost immediately after leaving town, the tarmac snaking above the familiar Leh skyline and slowly trading buildings for bare rock 
        and snow‑streaked ridges. Khardung La itself was cold, windy, and unforgettable – we stopped just long enough for a cup of tea, a few photos, 
        and that quiet moment of realizing we’d ridden our way to one of the world’s highest passes. From there the road dropped sharply towards the Shyok river, 
        the colours softening from harsh browns and whites to greener slopes, villages, and finally the wide open stretches near Hunder. 
        
        By the time we reached our stay close to the famous sand dunes, it felt less like we had changed hotels and more like we had crossed into a 
        different Ladakh altogether.`,
      },
      {
        type: "callout",
        tone: "note",
        title: "Key route facts",
        text: "Leh → South Pullu → Khardung La → North Pullu → Khardung village → Khalsar → Diskit / Hunder (Nubra Valley)",
      },
      {
        type: "image",
        src: "https://images.pexels.com/photos/24713335/pexels-photo-24713335.jpeg",
        caption: "Diskit Gompa, overlooking Nubra Valley",
      },
      {
        type: "itinerary",
        day: 4,
        title: "Nubra Valley → Pangong via Shyok",
        items: [
          "Drive to Pangong Lake passing through the Indo-China border",
          "Rides via Shayok river route",
          "Dinner and overnight stay at camps. At midnight enjoy the Galaxy views from your camp",
        ],
      },
      { type: "image", src: pangog, caption: "Solo at Pangong Lake" },
      {
        type: "p",
        text: `On Day 4, we rolled out of Hunder, leaving Nubra Valley behind and riding towards Pangong via the Shyok route instead of looping back to Leh.
         We started from Hunder soon after breakfast, fuelled up both the Himalayan 411 and ourselves, and followed the road back to Khalsar before turning off 
         towards Agham. From there the character of the ride changed completely: long, lonely stretches along the Shyok river, sections of smooth tarmac broken 
         by rough gravel, and the occasional water crossing that reminded us we were still in real Himalayan country. Villages grew smaller and farther apart as
          we rode on towards Durbuk and Tangtse, and then, without much warning, the landscape opened up to that first surreal glimpse of Pangong’s blue. 
          It had been a demanding day in the saddle, but rolling into Pangong by evening, with the lake glowing under the high‑altitude light, 
          felt like the perfect reward`,
      },
      {
        type: "image",
        src: "https://images.pexels.com/photos/12094542/pexels-photo-12094542.jpeg",
        caption: "Pangong Lake",
      },
      {
        type: "image",
        src: "https://images.pexels.com/photos/33792550/pexels-photo-33792550.jpeg",
        caption: "3 idiots",
      },
      {
        type: "itinerary",
        day: 5,
        title: "Hanle → Umingla → Hanle",
        items: [
          "Visit Umling-La, the world's highest motorable road",
          "Climb Umingla and soak in the summit views before descending back to Hanle",
          "The last village of India-China Border",
        ],
      },
      { type: "image", src: umingla, caption: "Umling La" },
      {
        type: "p",
        text: `(Day 5 & 6): Our next stretch out of Hanle was the most extreme day of the entire trip – a loop to Umling La and back. We left before sunrise, 
        the Himalayan 411’s headlight cutting through the cold, empty roads of Changthang as the sky slowly turned from black to blue.
         The tarmac soon gave way to rougher tracks, patches of sand, and long, rolling plains where it felt like we were riding on the roof of the world
          with almost no one else around. The final climb to Umling La was slow and deliberate, every throttle input careful in the thin air, until the road 
          finally spat us out at a signboard announcing the world’s highest motorable pass. We didn’t linger too long at the top – just enough for a few photos, 
          a quiet congratulations to each other, and a moment to let the altitude sink in – before turning back towards Hanle, chasing the same lonely roads 
          home as the light faded.`,
      },
      {
        type: "callout",
        tone: "note",
        title: "Altitude Discipline",
        text: "We kept our stops short, drank water even when we didn’t feel thirsty, and avoided running or sudden movements at the top.",
      },
      {
        type: "itinerary",
        day: 7,
        title: "Hanle → Leh",
        items: [
          "Tso Kar is a salt lake at 4,580 m. Stunning in the morning light.",
          "The road is gravel and can be rough. Take it slow.",
          "Return to Leh by evening, rest and enjoy the town.",
        ],
      },
      {
        type: "p",
        text: `Our final day on the road was the long ride back from Hanle to Leh, a quiet reset after the raw high of Umling La. 
        We left Hanle with the first light, following the narrow road out past Loma and Nyoma, where the landscape slowly softened from stark Changthang plains 
        to the more familiar curves of the Indus valley. The Himalayan 411 settled into an easy cruise on the smoother stretches, 
        broken up only by tea stops at small dhabas near Chumathang and the occasional pause to just stand and take in the silence. 
        By the time we crossed Upshi and rolled past Karu towards Leh, the chaos of the first day in town felt very far away; 
        we were returning to the same place, but with completely different eyes. Parking the bike in Leh that evening, dusty and tired, 
        it felt less like the end of a trip and more like we had just finished reading a book we’d wanted to live inside for years.`,
      },
      {
        type: "itinerary",
        day: 8,
        title: "At Leh",
        items: ["Rest and recuperate in Leh", "Explore the town and its attractions", "Prepare for the journey back"],
      },
      {
        type: "p",
        text: `The loop was complete: Nubra, Pangong, Hanle, Umling La, and finally back to Leh – not just lines on a map, but a ride that stitched together 
        some of the wildest corners of Ladakh. Yes, we were tired, exhausted, and a little worse for wear by the end of it. But we were also richer for the experience – the kind of ride that changes 
        how you think about what’s possible on two wheels, and leaves you with stories that will last a lifetime. It was a great achievement for all of us. `,
      },
      {
        type: "itinerary",
        day: 9,
        title: "Return to Bangalore",
        items: ["Leh to Delhi", "Explore Delhi and return to Bangalore", "Carry lot of memories"],
      },
      {
        type: "image",
        src: "https://images.pexels.com/photos/37839586/pexels-photo-37839586.jpeg",
        caption: "The beast who took me to places",
      },
      {
        type: "quote",
        text: "If this Ladakh circuit sparks even a small urge to ride north, save this itinerary, tweak it to your pace, and go meet these roads yourself. No blog, including this one, can fully explain how it feels when the wind, the silence, and the altitude all hit you at once on a Ladakh pass – that part you’ll have to discover on your own.",
      },
      { type: "image", src: bridgeOne, caption: "A bridge over the river" },
      { type: "h2", text: "What surprised me" },
      {
        type: "p",
        text: "Going into this trip, I thought I had a fair idea of what Ladakh would be like – high passes, difficult roads, and a few “bucket list” names to tick off. What I didn’t expect was how different the region feels once you’re actually there on a motorcycle, living out of a couple of bags and watching the landscape change one bend at a time. These are a few things that genuinely surprised me along the way.",
      },
      {
        type: "list",
        items: [
          "The silence between places: There are long stretches where it’s just the bike, the wind, and the sound of your own breath in the helmet, and that kind of silence is rare if you’re used to city life",
          "How quickly altitude reminds you who’s in charge:  You learn fast that Ladakh is not a place to show off; it’s a place to respect your limits, drink water, and take it slow.",
          "Roads that switch moods in minutes: On some days, the road was smoother than I expected – perfect blacktop, sweeping curves, and the kind of surface that makes you forget how far from home you are. Then, within a few kilometres, it would change to loose gravel, broken patches, or a surprise water crossing that demanded your full attention. ",
        ],
      },
      { type: "image", src: sceneryOne, caption: "A scenic view from the ride" },
      {
        type: "p",
        text: "If you’re planning your own Ladakh ride, keep some space in your itinerary – and in your head – for these small surprises. The big passes and famous lakes will impress you, but it’s these quieter details that will stay with you long after the dust has washed off your riding gear.",
      },
      {
        type: "faq",
        items: [
          {
            q: "What is the best route to take for the Leh-Ladakh Highway ride?",
            a: "The most common route is to start from Leh, head to Nubra Valley via Khardung La, then proceed to Pangong Lake, and finally return to Leh. This route allows you to experience the key highlights of the region while managing altitude acclimatization effectively.",
          },
        ],
      },
    ],
    // lessons: [
    //   "Acclimatise in Leh for 2 nights before starting.",
    //   "Carry a Diamox prescription. Use it on day 2, not day 4.",
    //   "Carry water, sunglasses, sunscreen, a light jacket, and keep an eye on winds – weather can change quickly even though the distance is small.",
    // ],
  },
  {
    slug: "sakleshpur-weekend-loop-from-bangalore",
    title: "The Sakleshpur Weekend Loop — A 2-Day Route from Bangalore",
    tagline: "250 km of monsoon greens, coffee stops, and one perfect ghat",
    excerpt:
      "A refreshing mix of misty hills, lush coffee estates, and historic landmarks.  Bangalore → Kunigal → Channarayapatna → Hassan → Sakleshpur, with the exact fuel stops, breakfast joints, and the one stretch worth waking up at 4am for.",
    category: "Route",
    region: "Western Ghats, India",
    startPoint: "Bangalore",
    endPoint: "Sakleshpur",
    distanceKm: 250,
    days: 2,
    elevationM: 1525,
    difficulty: "Moderate",
    terrain: "Highway, wet during monsoon",
    bestMonths: "June – September (for mist) / November – February (for grip)",
    publishedAt: "2025-10-21",
    image: sakleshpur,
    body: [
      {
        type: "p",
        text: "If someone has a weekend and a bike, this is the ride I send them on. It's the right amount of distance, the right kind of corners, and the kind of coffee at the end that justifies the soreness.",
      },
      { type: "h2", text: "Saturday: Bangalore → Sakleshpur (250 km)" },
      {
        type: "list",
        items: [
          "Leave by 5:00am. Mysore Road is a different animal after 8am.",
          "Breakfast at DVG Benne Dosa ( Hassan Highway ), no debate.",
          "Pick the Kunigal - Hassan - Sakleshpur route. Quieter, twistier, better surface.",
        ],
      },
      { type: "h2", text: "Sunday: Hassan → Nelamangala → Bangalore" },
      {
        type: "callout",
        tone: "tip",
        title: "The one stretch",
        text: "The stretch between Nelamangala and Bangalore will be moderate to heavy traffic, on Sunday's",
      },
      {
        type: "p",
        text: `Sometimes, all you need is two days away from the city to recharge. That's exactly what Sakleshpur offered—a perfect blend of winding mountain roads, endless coffee plantations, misty hills, and peaceful moments in nature.`,
      },
      { type: "h2", text: "The Journey Begins" },
      {
        type: "p",
        text: `Our trip started early in the morning from Bangalore. As the city slowly disappeared in the rearview mirror, highways gave way to lush greenery and rolling hills. The drive itself became part of the adventure.
        Started around 5 AM from Bangalore, reached our breakfast spot by 8 AM, DVG Benne Dosa. Their Benne Masala Dosa was wonderful.
        Without any competition or rush to reach our destination at a specific time, we took our time to enjoy the ride, the scenery, and the company. The route through Kunigal, Channarayapatna, and Hassan was smooth and enjoyable, with plenty of opportunities to stop and take in the views.
        Riding through Karnataka's coffee country is an experience every biker should have at least once. Long sweeping curves, towering trees, endless plantations, and the occasional mist rolling across the road make every kilometre worth it.
        By noon, we reached SasyaKashi Homestay.`,
      },
      {
        type: "image",
        src: "https://sasyakashi.com/gallery/Sasya-Kashi-HomeStay-01.jpg",
        caption: "SasyaKashi Homestay",
      },
      {
        type: "p",
        text: `The weather couldn't have been more perfect. Cold winds greeted us, thick clouds covered the sky, and it looked like rain could start at any moment. 
        Thankfully, we had come prepared with our riding rain gear.After parking the bikes and settling in, we decided not to rush anywhere.
        Instead, we spent the rest of the day relaxing, enjoying the peaceful surroundings, and letting our bodies recover from the morning ride. Sitting with a hot cup of coffee while watching the clouds drift over the hills was exactly the kind of break we had hoped for.
        Sometimes, the best riding days end not with more kilometres but with complete silence.`,
      },
      { type: "h2", text: "Day 2 – Roads Worth Riding" },
      {
        type: "p",
        text: `A good breakfast, cool mountain air, and motorcycles waiting outside—the perfect way to begin the second day.`,
      },
      {
        type: "p",
        text: `Our first destination was the iconic Shettihalli Rosary Church. The abandoned church stood gracefully against the backdrop of the reservoir, its weathered stone walls telling stories from another era. Whether surrounded by water or standing on dry land, 
        Shettihalli has a charm that's impossible to ignore.`,
      },
      { type: "image", src: rideShettihalli01, caption: "Shettihalli Church" },
      { type: "image", src: rideShettihalli02, caption: "Shettihalli Church" },
      {
        type: "p",
        text: `After spending some time exploring and photographing the church, we geared up for the highlight of the ride.`,
      },
      { type: "h2", text: "Climbing to Mullayanagiri" },
      {
        type: "p",
        text: `The ride towards Mullayanagiri, Karnataka's highest peak, was everything a biker could ask for.The road winds its way up the Western Ghats, offering breathtaking views at every turn. The air grows cooler, the vegetation denser, and the sense of adventure stronger with each kilometre.`,
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/7a/c3/15/7ac3151e3c68936507010306a3b635a3.jpg",
        caption: "Mullayanagiri",
      },
      {
        type: "p",
        text: `Reaching the summit of Mullayanagiri was a moment of triumph. The panoramic views of the surrounding hills and valleys were worth every twist and turn of the climb. We took a moment to soak it all in, capturing photos and making memories that would last long after the ride was over.`,
      },
      {
        type: "p",
        text: `Clouds drifted across the road, cool winds rushed past our helmets, and every stop offered panoramic views stretching far into the horizon.`,
      },
      {
        type: "p",
        text: `For riders, reaching Mullayanagiri isn't just about ticking another destination off the list—it's about enjoying every curve, every climb, and every moment along the way.`,
      },
      { type: "h2", text: "The Descent and Return" },
      {
        type: "p",
        text: `Descending from Mullayanagiri was just as thrilling as the climb. The curves demanded focus, but the scenery made it all worthwhile. As we made our way back to our SasyaKashi Homestay, we reflected on the journey—the roads we had conquered, the sights we had seen, and the camaraderie we had shared.`,
      },
      {
        type: "p",
        text: `By the time we returned to Bangalore, the weekend had flown by. The Sakleshpur loop had offered us a perfect escape from the city, a chance to reconnect with nature, and a reminder of why we ride.`,
      },
      { type: "h2", text: "One Last Stop – Manjarabad Fort" },
      {
        type: "p",
        text: `Before heading back to Bangalore, we made a quick detour to Manjarabad Fort. This star-shaped fort, built by Tipu Sultan, offered a glimpse into history and a chance to stretch our legs before the final leg of the journey. The fort's architecture and the surrounding views provided a fitting end to our weekend adventure.`,
      },
      {
        type: "p",
        text: `Reaching the fort requires climbing a series of steps, which can feel like a bit of a workout—especially after spending hours riding a motorcycle.`,
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/b0/28/cb/b028cb5dd0c7a1c9f6bf24c70869cd49.jpg",
        caption: "Manjarabad Fort",
      },
      { type: "h2", text: "Final Thoughts" },
      {
        type: "p",
        text: `This wasn't a ride about chasing speed or covering the most kilometres. It was about the journey itself—the roads, the views, the stops, and the stories we created along the way. For anyone looking for a weekend escape from Bangalore, the Sakleshpur loop is a ride that promises adventure, beauty, and memories that will last a lifetime.`,
      },
      {
        type: "p",
        text: `From the peaceful stay at SasyaKachi Homestay to the timeless beauty of Shettihalli Church and the breathtaking climb to Mullayanagiri, every part of this weekend reminded us why we ride.`,
      },
      {
        type: "p",
        text: `Sometimes, all it takes is two days, a full tank of fuel, and an open road to feel completely refreshed.`,
      },
      { type: "p", text: "Until the next ride, ride safe and keep exploring. 🏍️" },
    ],
    lessons: [
      "Carry rain gear June–September. Non-negotiable.",
      "Keep your fuel tank topped up before heading into remote stretches.",
      "Wear proper riding gear, including a helmet, jacket, gloves, and riding shoes.",
      "Don't ride the ghat after dark. Cattle, pedestrians, no streetlights.",
      "Check your motorcycle before starting the trip, especially tyres and brakes.",
      "Be cautious on mountain roads and around blind corners.",
      "Avoid rushing between destinations—the roads are part of the experience.",
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
      {
        type: "p",
        text: "Every rider I know over-packs the first long trip and under-packs the second. Here's where I've landed after a few thousand kilometres of trial and (mostly) error.",
      },
      { type: "h2", text: "On the body" },
      {
        type: "list",
        items: [
          "ABS-certified full-face helmet with a Pinlock anti-fog insert.",
          "Mesh riding jacket with CE level-2 armour. Add a thermal liner for the Himalayas.",
          "Knee guards under riding pants. Not over.",
          "Short cuff summer gloves + long cuff winter gloves. Both, always.",
          "Waterproof riding boots above the ankle. No exceptions.",
        ],
      },
      { type: "h2", text: "On the bike" },
      {
        type: "list",
        items: [
          "Tank bag with map sleeve — phone goes here, not on the bars.",
          "50L tail bag, dry-bag style. Roll closure, not zip.",
          "Tubeless puncture kit + 12V mini compressor.",
          "Two bungee cords. Always two.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "What I stopped carrying",
        text: "GoPro chest mount (never used it), spare clutch cable (modern cables don't snap like they used to), and a tent (I'd rather pay ₹800 for a homestay and sleep).",
      },
    ],
    lessons: [
      "Buy the helmet you'd want in a crash, not the one that matches the bike.",
      "Cheap luggage will fail at the worst moment. Pay once.",
      "Earplugs. Seriously. Every ride over 200 km.",
    ],
  },
];

export const getRideBySlug = (slug: string) => rides.find((r) => r.slug === slug);
