import type { Destination } from "./types";
import bali from "@/assets/dest-bali.jpg";
import iceland from "@/assets/dest-iceland.jpg";
import japan from "@/assets/dest-japan.jpg";
import greece from "@/assets/dest-greece.jpg";
import switzerland from "@/assets/post-switzerland.jpg";
import singapore from "@/assets/post-singapore.jpg";
import paris from "@/assets/post-paris.jpg";
import bangalore from "@/assets/post-bangalore.jpg";
import almaty from "@/assets/dest-almaty.jpg";

export const destinations: Destination[] = [
  // { slug: "bali", name: "Bali", country: "Indonesia", region: "Southeast Asia", tagline: "Rice terraces & ritual mornings", description: "Slow Ubud mornings, salt-air evenings in Canggu, and ceremonies you stumble into without planning.", image: bali, bestTime: "April – October", currency: "IDR", visited: true },
  // { slug: "iceland", name: "Iceland", country: "Iceland", region: "Northern Europe", tagline: "Black sand & blue hours", description: "A ring road, a hundred waterfalls, and the kind of weather that rewrites your itinerary every morning.", image: iceland, bestTime: "June – August / Feb for aurora", currency: "ISK", visited: true },
  // { slug: "japan", name: "Japan", country: "Japan", region: "East Asia", tagline: "Quiet temples, loud trains", description: "Kyoto's bamboo dawn, Tokyo's late-night ramen, and shinkansen windows full of rice paddies.", image: japan, bestTime: "March – May / Oct – Nov", currency: "JPY", visited: true },
  // { slug: "greece", name: "Greece", country: "Greece", region: "Southern Europe", tagline: "Caldera light, slow lunches", description: "Island ferries, taverna afternoons, and sunsets you eventually stop photographing.", image: greece, bestTime: "May – June / September", currency: "EUR", visited: true },
  // { slug: "switzerland", name: "Switzerland", country: "Switzerland", region: "Central Europe", tagline: "Postcards every five minutes", description: "Gondolas, cowbells, and trains that run more reliably than your watch.", image: switzerland, bestTime: "June – September", currency: "CHF", visited: true },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Southeast Asia",
    tagline: "Hawker food + skyline",
    description: "The easiest first stop in Asia — eat your way through, sleep well, then push deeper into the region.",
    image: singapore,
    bestTime: "February – April",
    currency: "SGD",
    visited: true,
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "Western Europe",
    tagline: "Boulevards & late dinners",
    description: "Long walks along the Seine, museums on rainy mornings, and a bakery on every corner.",
    image: paris,
    bestTime: "April – June / September",
    currency: "EUR",
    visited: true,
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    country: "India",
    region: "South Asia",
    tagline: "Cafés, gardens, monsoons",
    description: "Home — and an underrated long-weekend city with the best coffee culture in India.",
    image: bangalore,
    bestTime: "October – February",
    currency: "INR",
    visited: true,
  },
  {
    slug: "almaty",
    name: "Almaty",
    country: "Kazakhstan",
    region: "Central Asia",
    tagline: "Mountains at the city edge",
    description: "A Soviet-modern grid pressed against the Tian Shan range — apple orchards, cable-car sunsets, and the most unexpected Central Asian intro.",
    image: almaty,
    bestTime: "June – September / December – February for snow",
    currency: "KZT",
    visited: false,
    guidesNote:
      "I haven't made it to Almaty yet, but it's high on the list. Here's what I've gathered so far:\n\n" +
      "• Start at Kok-Tobe for a panoramic sunset over the city and the mountains beyond.\n" +
      "• Medeu + Shymbulak are the go-to day trips — skating in winter, hiking in summer.\n" +
      "• The Green Bazaar is the best introduction to Central Asian produce and street snacks.\n" +
      "• Try beshbarmak (boiled horse meat with noodles) and manti at a local canteen.\n" +
      "• Day-trip to Big Almaty Lake — turquoise alpine water about an hour south.\n" +
      "• Stay near Panfilov Park or Abay Avenue for walkable café and museum access.\n\n" +
      "Visa: visa-free for many nationalities up to 30 days. Language: Russian and Kazakh; English is spotty outside hotels.",
  },
];

export const getDestinationBySlug = (slug: string) => destinations.find((d) => d.slug === slug);
