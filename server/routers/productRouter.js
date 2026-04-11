import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getFeaturedProductsByCategory,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/:category", getProductsByCategory);
productRouter.get("/:category/featured", getFeaturedProductsByCategory);

export default productRouter;
