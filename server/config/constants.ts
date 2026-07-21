export const CATEGORY_MAP = {
  guitars: [
    "electric-guitars",
    "bass-guitars",
    "acoustic-guitars",
    "clasical-guitars",
  ],
  amplification: ["amp-heads", "combo-amps", "cabinets", "bass-amps"],
  effects: [
    "overdrive-distortion",
    "delay",
    "reverb",
    "wah",
    "modulation",
    "multi-effects",
  ],
  accessories: ["guitar-strings", "bass-strings", "picks", "straps"],
  recording: [
    "audio-interfaces",
    "studio-headphones",
    "studio-monitors",
    "microphones",
  ],
  maintenance: ["guitar-tools", "guitar-care"],
} as const;

export const BRAND_SLUGS = [
  "fender",
  "gibson",
  "ibanez",
  "jackson",
  "esp",
  "prs",
  "schecter",
  "epiphone",
  "marshall",
  "mesa-boogie",
  "orange",
  "evh",
  "boss",
  "electro-harmonix",
  "strymon",
  "focusrite",
  "shure",
  "elixir",
  "ernie-ball",
  "daddario",
  "dunlop",
] as const;

export type Brand = keyof typeof BRAND_SLUGS;
export type Category = keyof typeof CATEGORY_MAP;
export type SubCategory = (typeof CATEGORY_MAP)[Category][number];

export const DEFAULT_PAGE_LIMIT = 15;

export const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  mostSold: { amountSold: -1 },
  rating: { rating: -1 },
  priceAsc: { price: 1 },
  priceDesc: { price: -1 },
} as const;
