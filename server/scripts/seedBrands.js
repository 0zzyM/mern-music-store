import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Brand from "../models/brandModel.js";

dotenv.config();

const brands = [
  {
    name: "Jackson",
    slug: "jackson",
    image: "https://picsum.photos/400/300",
    description: "Best selection from Jackson Guitars",
    isActive: true,
  },
  {
    name: "Ibanez",
    slug: "ibanez",
    image: "https://picsum.photos/400/300",
    description: "Best selection from Ibanez Guitars",
    isActive: true,
  },
  {
    name: "Fender",
    slug: "fender",
    image: "https://picsum.photos/400/300",
    description: "Best selection from Fender Guitars",
    isActive: true,
  },
  {
    name: "Gibson",
    slug: "gibson",
    image: "https://picsum.photos/400/300",
    description: "Best selection from Gibson",
    isActive: true,
  },
  {
    name: "EVH",
    slug: "evh",
    image: "https://picsum.photos/400/300",
    description: "Best selection from EVH",
    isActive: true,
  },
  {
    name: "Marshall",
    slug: "marshall",
    image: "https://picsum.photos/400/300",
    description: "Best selection from Marshall",
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data first
    await Brand.deleteMany({});

    // Insert categories
    await Brand.insertMany(brands);
    console.log("Categories inserted");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
