import mongoose from "mongoose";
import { CATEGORY_MAP } from "../config/constants.js";

const ALL_SUBCATEGORIES = Object.values(CATEGORY_MAP).flat();

// Create the Sub-Category schema
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "Electric Guitars",
        "Bass Guitars",
        "Acoustic Guitars",
        "Amp Heads",
        "Combo Amps",
        "Cabinets",
        "Bass Amps",
        "Overdrive & Distortion",
        "Delay & Reverb",
        "Modulation",
        "Multi-effects",
        "Guitar Strings",
        "Bass Strings",
        "Picks",
        "Straps",
        "Tuners",
        "Audio Interfaces",
        "Studio Headphones",
        "Microphones",
        "Guitar Tools",
        "Guitar Care",
      ],
      required: true,
    },
    slug: {
      type: String,
      enum: ALL_SUBCATEGORIES,
      required: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Create the Subcategory model
const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
