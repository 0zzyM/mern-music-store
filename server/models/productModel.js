import mongoose from "mongoose";
import { CATEGORY_MAP } from "../config/constants.js";

// Create the Product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: ["Jackson", "Marshall", "Ibanez", "Fender", "EVH"],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
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
    },
    subcategory: {
      type: String,
      required: true,
      enum: [
        // Guitars
        "electric-guitars",
        "bass-guitars",
        "acoustic-guitars",
        // Amplification
        "amp-heads",
        "combo-amps",
        "cabinets",
        "bass-amps",
        // Effects
        "overdrive-distortion",
        "delay",
        "reverb",
        "modulation",
        "multi-effects",
        // Accessories
        "guitar-strings",
        "bass-strings",
        "picks",
        "straps",
        "tuners",
        // Recording
        "audio-interfaces",
        "studio-headphones",
        "microphones",
        // Maintenance
        "guitar-tools",
        "guitar-care",
      ],
      validate: {
        validator: function categoryValidator(value) {
          const validSubCategories = CATEGORY_MAP[this.category];
          if (!validSubCategories) return false;

          return validSubCategories.includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid subcategory for the selected category`,
      },
    },
    amountSold: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    // TODO: Replace Mixed with category-specific schemas once all product types are defined

    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

// Create the User model from the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
