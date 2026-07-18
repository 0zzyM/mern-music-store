import mongoose from "mongoose";
import { CATEGORY_MAP } from "../config/constants.js";

// Create the Category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "Guitars",
        "Amplification",
        "Effects",
        "Accessories",
        "Recording",
        "Maintenance",
      ],
      required: true,
    },
    slug: {
      type: String,
      enum: Object.keys(CATEGORY_MAP),
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
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Create Category model
const Category = mongoose.model("Category", categorySchema);

export type CategoryDoc = mongoose.InferSchemaType<typeof categorySchema>;

export default Category;
