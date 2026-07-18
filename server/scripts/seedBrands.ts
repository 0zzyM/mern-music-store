import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Brand, { BrandDoc } from "../models/brandModel.js";

dotenv.config();

const IMAGE_RESIZE_OPTIONS = "h_360,c_scale,q_auto,f_auto";

type BrandSeed = Omit<BrandDoc, "createdAt" | "updatedAt">;

const brands: BrandSeed[] = [
  // Guitars
  {
    name: "Fender",
    slug: "fender",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779506/fender-logo_ov3tkd.png`,
    description:
      "American icon since 1946, home of the Stratocaster and Telecaster. Fender shapes the sound of rock, blues, and country.",
    isActive: true,
  },
  {
    name: "Gibson",
    slug: "gibson",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779506/gibson-logo_swhzfj.png`,
    description:
      "The legend behind the Les Paul and SG. Gibson has defined the tone of rock and blues for over a century.",
    isActive: true,
  },
  {
    name: "Ibanez",
    slug: "ibanez",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/ibanez-logo_wzm96k.png`,
    description:
      "Trusted by shredders and jazz players alike. Ibanez delivers precision, playability, and versatility at every price point.",
    isActive: true,
  },
  {
    name: "Jackson",
    slug: "jackson",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/jackson-logo_a6q32v.png`,
    description:
      "Built for speed and aggression. Jackson guitars are the weapon of choice for metal and hard rock players worldwide.",
    isActive: true,
  },
  {
    name: "ESP",
    slug: "esp",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779506/esp-logo_nbq4e6.png`,
    description:
      "Forged in the world of heavy metal. ESP crafts high-performance guitars favored by some of the most demanding players in the world.",
    isActive: true,
  },
  {
    name: "PRS",
    slug: "prs",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/prs-logo_cfwmmy.png`,
    description:
      "Where art meets engineering. PRS guitars are renowned for their flawless craftsmanship, stunning finishes, and exceptional tone.",
    isActive: true,
  },
  {
    name: "Schecter",
    slug: "schecter",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/schecter-logo_xjx1lm.png`,
    description:
      "Premium features at an accessible price. Schecter has become a go-to brand for rock and metal players seeking quality without compromise.",
    isActive: true,
  },
  {
    name: "Epiphone",
    slug: "epiphone",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779504/epiphone-logo_odzhks.png`,
    description:
      "Gibson quality made accessible. Epiphone brings iconic designs like the Les Paul and Casino to players at every budget.",
    isActive: true,
  },
  // Amps
  {
    name: "Marshall",
    slug: "marshall",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/marshall-logo_haokva.png`,
    description:
      "The sound of rock and roll. Marshall amplifiers have powered stages worldwide since the 1960s, delivering iconic British tone.",
    isActive: true,
  },
  {
    name: "Mesa Boogie",
    slug: "mesa-boogie",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/mesa-logo_sbk2th.png`,
    description:
      "Pioneering high-gain amplification since the 1970s. Mesa Boogie amps are celebrated for their rich harmonics and unmatched versatility.",
    isActive: true,
  },
  {
    name: "Orange",
    slug: "orange",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/orange-logo_bmghzs.png`,
    description:
      "Unmistakable British tone wrapped in iconic orange tolex. Orange amps deliver warm, thick sounds loved by rock and indie players.",
    isActive: true,
  },
  {
    name: "EVH",
    slug: "evh",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779832484/evh-logo_lmtbwh.png`,
    description:
      "Born from Eddie Van Halen's relentless pursuit of the perfect tone. EVH guitars and amps carry the legacy of one of rock's greatest innovators.",
    isActive: true,
  },
  // Effects
  {
    name: "Boss",
    slug: "boss",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779504/boss-logo_fpya1f.png`,
    description:
      "The world's most trusted effects pedals. Boss has been the standard for reliability and tone on pedalboards for decades.",
    isActive: true,
  },
  {
    name: "Electro-Harmonix",
    slug: "electro-harmonix",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779780000/electro-harmonix-logo_grdemt.png`,
    description:
      "New York-born, genre-defying effects. Electro-Harmonix pedals like the Big Muff have shaped the sound of generations of musicians.",
    isActive: true,
  },
  {
    name: "Strymon",
    slug: "strymon",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779832369/strymon-logo_cmuyq4.png`,
    description:
      "Studio-grade effects in a pedalboard format. Strymon is the gold standard for reverb, delay, and modulation pedals.",
    isActive: true,
  },
  // Recording
  {
    name: "Focusrite",
    slug: "focusrite",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779506/focusrite-logo_vygbak.png`,
    description:
      "The world's best-selling audio interface brand. Focusrite's Scarlett series has become the go-to choice for home and studio recording.",
    isActive: true,
  },
  {
    name: "Shure",
    slug: "shure",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779503/shure-logo_be62ie.png`,
    description:
      "Leading global manufacturer of audio and collaboration technology, including microphones, wireless systems, conference room solutions and more.",
    isActive: true,
  },
  // Strings & Accessories
  {
    name: "Elixir",
    slug: "elixir",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779832318/elixir-logo_r9c92j.png`,
    description:
      "The string of choice for legends. Elixir strings have been wound onto the guitars of Clapton, Hendrix, and Slash.",
    isActive: true,
  },
  {
    name: "Ernie Ball",
    slug: "ernie-ball",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779504/ernie-ball-logo_cnfsfj.png`,
    description:
      "The string of choice for legends. Ernie Ball Slinky strings have been wound onto the guitars of Clapton, Hendrix, and Slash.",
    isActive: true,
  },
  {
    name: "D'Addario",
    slug: "daddario",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779504/daddario-logo_gqfgma.png`,
    description:
      "Over 300 years of string-making heritage. D'Addario crafts strings and accessories trusted by professional musicians across every genre.",
    isActive: true,
  },
  {
    name: "Dunlop",
    slug: "dunlop",
    image: `https://res.cloudinary.com/drbhtzgcs/image/upload/${IMAGE_RESIZE_OPTIONS}/v1779779504/dunlop-logo_djevll.png`,
    description:
      "From Cry Baby wahs to Tortex picks, Dunlop makes the accessories that players reach for every single day.",
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Brand.deleteMany({});
    await Brand.insertMany(brands);
    console.log(`${brands.length} brands inserted successfully`);
  } catch (error) {
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
