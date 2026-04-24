import mongoose from "mongoose";

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
      enum: [
        "guitars",
        "amplification",
        "effects",
        "accessories",
        "recording",
        "maintenance",
      ],
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

export default Category;
