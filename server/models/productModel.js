import mongoose from "mongoose";

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
        "electric-guitars",
        "electric-guitars-amplifiers",
        "guitar-cabinets",
        "guitar-strings",
        "picks",
      ],
      required: true,
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
