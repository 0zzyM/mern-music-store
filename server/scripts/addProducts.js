import mongoose from "mongoose";
import Product from "../models/productModel.js";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const products = [
  {
    name: "Product 4",
    brand: "Jackson",
    images: ["https://picsum.photos/400/300"],
    price: 2000,
    stock: 5,
    category: "electric-guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 5",
    brand: "Marshall",
    images: ["https://picsum.photos/400/300"],
    price: 1222,
    stock: 9,
    category: "electric-guitars-amplifiers",
    isFeatured: true,
    details: {},
  },
  {
    name: "Product 6",
    brand: "Fender",
    images: ["https://picsum.photos/400/300"],
    price: 22,
    stock: 1,
    category: "electric-guitars",
    isFeatured: true,
    details: {},
  },
];

const addProducts = async () => {
  try {
    await connectDB();
    await Product.insertMany(products);
    console.log("Products added to DB");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding products", error);
    mongoose.connection.close();
  }
};

addProducts();
