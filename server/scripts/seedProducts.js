import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";

import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const products = [
  {
    name: "Jackson Soloist SL1",
    brandSlug: "jackson",
    images: ["https://i.imgur.com/kPWD8BE.png"],
    price: 3599,
    stock: 5,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Fender USA Professional Classic Stratocaster",
    brandSlug: "fender",
    images: ["https://i.imgur.com/zy1wwrA.png"],
    price: 1849,
    stock: 1,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Marshall JVM 410",
    brandSlug: "marshall",
    images: ["https://i.imgur.com/NssFQbY.png"],
    price: 1299,
    stock: 1,
    categorySlug: "amplification",
    subcategorySlug: "amp-heads",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 4",
    brandSlug: "jackson",
    images: ["https://picsum.photos/400/300"],
    price: 2000,
    stock: 5,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 5",
    brandSlug: "marshall",
    images: ["https://picsum.photos/400/300"],
    price: 1222,
    stock: 9,
    categorySlug: "amplification",
    subcategorySlug: "combo-amps",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 6",
    brandSlug: "fender",
    images: ["https://picsum.photos/400/300"],
    price: 22,
    stock: 1,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 7",
    brandSlug: "ibanez",
    images: ["https://picsum.photos/400/300"],
    price: 379,
    stock: 4,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "EVH 5150",
    brandSlug: "evh",
    images: ["https://picsum.photos/400/300"],
    price: 1849,
    stock: 9,
    categorySlug: "amplification",
    subcategorySlug: "amp-heads",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 9",
    brandSlug: "fender",
    images: ["https://picsum.photos/400/300"],
    price: 2211,
    stock: 1,
    categorySlug: "guitars",
    subcategorySlug: "electric-guitars",
    isFeatured: true,
    details: {},
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    //Clear existing data first
    await Product.deleteMany({});

    // Build slug to ObjectId map for each

    //Categories
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    //Sub-Categories
    const subcategories = await Subcategory.find({});
    const subcategoryMap = {};
    subcategories.forEach((subcat) => {
      subcategoryMap[subcat.slug] = subcat._id;
    });

    //Brands
    const brands = await Brand.find({});
    const brandMap = {};
    brands.forEach((brand) => {
      brandMap[brand.slug] = brand._id;
    });

    const productsWithIds = products.map((product) => ({
      name: product.name,
      brand: brandMap[product.brandSlug],
      images: product.images,
      price: product.price,
      stock: product.stock,
      category: categoryMap[product.categorySlug],
      subcategory: subcategoryMap[product.subcategorySlug],
      isFeatured: product.isFeatured,
      details: product.details,
    }));

    // Insert products

    await Product.insertMany(productsWithIds);
    console.log("Products added to DB");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding products", error);
    mongoose.connection.close();
  }
};

seedDatabase();
