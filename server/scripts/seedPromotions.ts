import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Promotion, { PromotionDoc } from "../models/promotionModel.js";

dotenv.config();

type SeedPromotions = Omit<PromotionDoc, "createdAt" | "updatedAt">;

const promotions: SeedPromotions[] = [
  {
    title: "Unleash Your Tone",
    subtitle: "Build your dream pedalboard for less",
    image:
      "https://res.cloudinary.com/drbhtzgcs/image/upload/v1781001342/pedals-promotion_qy2yor.jpg",
    ctaText: "Discover Now",
    ctaLink: "/categories/effects",
    order: 10,
    isActive: true,
  },
  {
    title: "Find Your Sound with us",
    subtitle: "Premium guitars from top brands",
    image:
      "https://res.cloudinary.com/drbhtzgcs/image/upload/v1781001338/guitar-promotion_vwskba.jpg",
    ctaText: "Discover Now",
    ctaLink: "/categories/guitars",
    order: 20,
    isActive: true,
  },
  {
    title: "Crank Up to 50% Off on Amplifiers",
    subtitle: "From bedroom practice to stadium stages",
    image:
      "https://res.cloudinary.com/drbhtzgcs/image/upload/v1781001345/amp-promotion_bqdcje.jpg",
    ctaText: "Discover Now",
    ctaLink: "/categories/amplification",
    order: 30,
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Promotion.deleteMany({});
    await Promotion.insertMany(promotions);
    console.log(`${promotions.length} promotions inserted successfully`);
  } catch (error) {
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
