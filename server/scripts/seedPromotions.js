import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Promotion from "../models/promotionModel.js";

dotenv.config();

const promotions = [
  {
    title: "Find Your Sound",
    subtitle: "Premium guitars from top brands",
    image:
      "https://res.cloudinary.com/drbhtzgcs/image/upload/v1781001338/guitar-promotion_vwskba.jpg",
    ctaText: "Discover Now",
    ctaLink: "/categories/guitars",
    order: 10,
  },
  {
    title: "Crank Up to 50% Off on Amplifiers",
    subtitle: "From bedroom practice to stadium stages",
    image:
      "https://res.cloudinary.com/drbhtzgcs/image/upload/v1781001345/amp-promotion_bqdcje.jpg",
    ctaText: "Discover Now",
    ctaLink: "/categories/amplification",
    order: 20,
  },
  {
    title: "Unleash Your Tone",
    subtitle: "Build your dream pedalboard for less",
    image:
      "https://res.cloudinary.com/drbhtzgcs/image/upload/v1781001342/pedals-promotion_qy2yor.jpg",
    ctaText: "Discover Now",
    ctaLink: "/categories/effects",
    order: 30,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Promotion.deleteMany({});
    await Promotion.insertMany(promotions);
    console.log(`${promotions.length} promotions inserted successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
