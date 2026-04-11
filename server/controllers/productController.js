import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  res.json({ message: "getAllProducts is working" });
};
export const getFeaturedProducts = async (req, res) => {};
export const getProductsByCategory = async (req, res) => {};
export const getFeaturedProductsByCategory = async (req, res) => {};
