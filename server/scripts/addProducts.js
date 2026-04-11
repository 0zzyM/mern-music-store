import mongoose from "mongoose";
import Product from "../models/productModel.js";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const products = [
  {
    name: "Jackson Soloist SL1",
    brand: "Jackson",
    images: ["https://i.imgur.com/kPWD8BE.png"],
    price: 3599,
    stock: 5,
    category: "Electric Guitars",
    isFeatured: true,
    details: {},
  },
  {
    name: "Marshall JVM 410",
    brand: "Marshall",
    images: ["https://i.imgur.com/NssFQbY.png"],
    price: 1299,
    stock: 9,
    category: "Electric Guitar Amplifiers",
    isFeatured: true,
    details: {},
  },
  {
    name: "Fender USA Professional Classic Stratocaster",
    brand: "Fender",
    images: ["https://i.imgur.com/zy1wwrA.png"],
    price: 1849,
    stock: 1,
    category: "Electric Guitars",
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
