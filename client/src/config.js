export const SERVER_URL = import.meta.env.VITE_API_URL;
export const DEFAULT_CURRENCY = "€";

// Used in homepage carousels
export const ITEMS_PER_PAGE = 12;

// Used in Products Page
export const PRODUCTS_PER_PAGE = 15;

// Hardcoded used in Navbars
export const CATEGORIES = [
  {
    name: "Guitars",
    slug: "guitars",
    subcategories: [
      { name: "Electric Guitars", slug: "electric-guitars" },
      { name: "Bass Guitars", slug: "bass-guitars" },
      { name: "Acoustic Guitars", slug: "acoustic-guitars" },
      { name: "Clasical Guitars", slug: "clasical-guitars" },
    ],
  },
  {
    name: "Amplification",
    slug: "amplification",
    subcategories: [
      { name: "Amp Heads", slug: "amp-heads" },
      { name: "Cabinets", slug: "cabinets" },
      { name: "Combo Amps", slug: "combo-amps" },
      { name: "Bass Amps", slug: "bass-amps" },
    ],
  },
  {
    name: "Effects",
    slug: "effects",
    subcategories: [
      { name: "Overdrive & Distortion", slug: "overdrive-distortion" },
      { name: "Reverb", slug: "reverb" },
      { name: "Delay", slug: "delay" },
      { name: "Wah", slug: "wah" },
      { name: "Modulation", slug: "modulation" },
      { name: "Multi-effects", slug: "multi-effects" },
    ],
  },
  {
    name: "Recording",
    slug: "recording",
    subcategories: [
      { name: "Audio Interfaces", slug: "audio-interfaces" },
      { name: "Studio Headphones", slug: "studio-headphones" },
      { name: "Studio Monitors", slug: "studio-monitors" },
      { name: "Microphones", slug: "microphones" },
    ],
  },
  {
    name: "Maintenance",
    slug: "maintenance",
    subcategories: [
      { name: "Guitar Care", slug: "guitar-care" },
      { name: "Guitar Tools", slug: "Guitar Tools" },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    subcategories: [
      { name: "Guitar Strings", slug: "guitar-strings" },
      { name: "Bass Strings", slug: "bass-strings" },
      { name: "Picks", slug: "picks" },
      { name: "Straps", slug: "straps" },
    ],
  },
];
