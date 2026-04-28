import mongoose from "mongoose";
import Category from "../models/categoryModel.js";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Subcategory from "../models/subcategoryModel.js";

dotenv.config();

const categories = [
  {
    name: "Guitars",
    slug: "guitars",
    image: "https://picsum.photos/400/300",
    description: "Electric, bass, and acoustic guitars from top brands",
    subcategories: [],
    isActive: true,
  },
  {
    name: "Amplification",
    slug: "amplification",
    image: "https://picsum.photos/400/300",
    description: "Amp heads, combos, and cabinets for every style",
    subcategories: [],
    isActive: true,
  },
  {
    name: "Effects",
    slug: "effects",
    image: "https://picsum.photos/400/300",
    description: "Pedals and effects to shape your sound",
    subcategories: [],
    isActive: true,
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://picsum.photos/400/300",
    description: "Strings, picks, straps, and essential gear",
    subcategories: [],
    isActive: true,
  },
  {
    name: "Recording",
    slug: "recording",
    image: "https://picsum.photos/400/300",
    description: "Audio interfaces, microphones, and studio equipment",
    subcategories: [],
    isActive: true,
  },
  {
    name: "Maintenance",
    slug: "maintenance",
    image: "https://picsum.photos/400/300",
    description: "Tools and care products to keep your gear in shape",
    subcategories: [],
    isActive: true,
  },
];

const subcategories = [
  // Guitars
  {
    name: "Electric Guitars",
    slug: "electric-guitars",
    parentCategorySlug: "guitars",
    image: "https://picsum.photos/400/300",
    description: "Solid body electric guitars from top brands",
    isActive: true,
  },
  {
    name: "Bass Guitars",
    slug: "bass-guitars",
    parentCategorySlug: "guitars",
    image: "https://picsum.photos/400/300",
    description: "4, 5, and 6-string bass guitars",
    isActive: true,
  },
  {
    name: "Acoustic Guitars",
    slug: "acoustic-guitars",
    parentCategorySlug: "guitars",
    image: "https://picsum.photos/400/300",
    description: "Acoustic and electro-acoustic guitars",
    isActive: true,
  },

  // Amplification
  {
    name: "Amp Heads",
    slug: "amp-heads",
    parentCategorySlug: "amplification",
    image: "https://picsum.photos/400/300",
    description: "Tube and solid-state amplifier heads",
    isActive: true,
  },
  {
    name: "Combo Amps",
    slug: "combo-amps",
    parentCategorySlug: "amplification",
    image: "https://picsum.photos/400/300",
    description: "All-in-one combo amplifiers",
    isActive: true,
  },
  {
    name: "Cabinets",
    slug: "cabinets",
    parentCategorySlug: "amplification",
    image: "https://picsum.photos/400/300",
    description: "Guitar speaker cabinets",
    isActive: true,
  },
  {
    name: "Bass Amps",
    slug: "bass-amps",
    parentCategorySlug: "amplification",
    image: "https://picsum.photos/400/300",
    description: "Bass amplifiers and cabinets",
    isActive: true,
  },

  // Effects
  {
    name: "Overdrive & Distortion",
    slug: "overdrive-distortion",
    parentCategorySlug: "effects",
    image: "https://picsum.photos/400/300",
    description: "Overdrive, distortion, and fuzz pedals",
    isActive: true,
  },
  {
    name: "Delay",
    slug: "delay",
    parentCategorySlug: "effects",
    image: "https://picsum.photos/400/300",
    description: "Delay effect pedals",
    isActive: true,
  },
  {
    name: "Reverb",
    slug: "reverb",
    parentCategorySlug: "effects",
    image: "https://picsum.photos/400/300",
    description: "Reverb effect pedals",
    isActive: true,
  },
  {
    name: "Modulation",
    slug: "modulation",
    parentCategorySlug: "effects",
    image: "https://picsum.photos/400/300",
    description: "Chorus, flanger, phaser, and tremolo pedals",
    isActive: true,
  },
  {
    name: "Multi-effects",
    slug: "multi-effects",
    parentCategorySlug: "effects",
    image: "https://picsum.photos/400/300",
    description: "Multi-effects processors and pedalboards",
    isActive: true,
  },

  // Accessories
  {
    name: "Guitar Strings",
    slug: "guitar-strings",
    parentCategorySlug: "accessories",
    image: "https://picsum.photos/400/300",
    description: "Electric and acoustic guitar strings",
    isActive: true,
  },
  {
    name: "Bass Strings",
    slug: "bass-strings",
    parentCategorySlug: "accessories",
    image: "https://picsum.photos/400/300",
    description: "Bass guitar strings",
    isActive: true,
  },
  {
    name: "Picks",
    slug: "picks",
    parentCategorySlug: "accessories",
    image: "https://picsum.photos/400/300",
    description: "Guitar and bass picks",
    isActive: true,
  },
  {
    name: "Straps",
    slug: "straps",
    parentCategorySlug: "accessories",
    image: "https://picsum.photos/400/300",
    description: "Guitar and bass straps",
    isActive: true,
  },
  {
    name: "Tuners",
    slug: "tuners",
    parentCategorySlug: "accessories",
    image: "https://picsum.photos/400/300",
    description: "Clip-on, pedal, and rack tuners",
    isActive: true,
  },

  // Recording
  {
    name: "Audio Interfaces",
    slug: "audio-interfaces",
    parentCategorySlug: "recording",
    image: "https://picsum.photos/400/300",
    description: "USB and Thunderbolt audio interfaces",
    isActive: true,
  },
  {
    name: "Studio Headphones",
    slug: "studio-headphones",
    parentCategorySlug: "recording",
    image: "https://picsum.photos/400/300",
    description: "Closed and open-back studio headphones",
    isActive: true,
  },
  {
    name: "Microphones",
    slug: "microphones",
    parentCategorySlug: "recording",
    image: "https://picsum.photos/400/300",
    description: "Dynamic and condenser microphones",
    isActive: true,
  },

  // Maintenance
  {
    name: "Guitar Tools",
    slug: "guitar-tools",
    parentCategorySlug: "maintenance",
    image: "https://picsum.photos/400/300",
    description: "Setup tools, truss rod wrenches, and string winders",
    isActive: true,
  },
  {
    name: "Guitar Care",
    slug: "guitar-care",
    parentCategorySlug: "maintenance",
    image: "https://picsum.photos/400/300",
    description: "Polish, fretboard oil, and cleaning supplies",
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data first
    await Category.deleteMany({});
    await Subcategory.deleteMany({});

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log("Categories inserted");

    // Build the slug to ObjectId map from inserted documents
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    // Transform subcategories with parent ObjectIds
    const subcategoriesWithIds = subcategories.map((sub) => ({
      name: sub.name,
      slug: sub.slug,
      image: sub.image,
      description: sub.description,
      isActive: sub.isActive,
      parentCategory: categoryMap[sub.parentCategorySlug],
    }));

    // Insert subcategories
    const insertedSubCategories =
      await Subcategory.insertMany(subcategoriesWithIds);
    console.log("Subcategories inserted");

    const categoriesWithIds = {};

    // Transform Categories to Categories with subcat Ids
    for (const cat of insertedCategories) {
      for (const subcat of insertedSubCategories) {
        // if (subcat.parentCategory === cat._id) === doesn't work with ObjectIds
        if (subcat.parentCategory.equals(cat._id)) {
          if (!categoriesWithIds[cat._id]) {
            categoriesWithIds[cat._id] = [];
          }
          categoriesWithIds[cat._id].push(subcat._id);
        }
      }
    }

    // Update categories
    for (const catId in categoriesWithIds) {
      await Category.findByIdAndUpdate(catId, {
        subcategories: categoriesWithIds[catId],
      });
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
