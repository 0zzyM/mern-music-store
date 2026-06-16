import express from "express";
import { getProducts, getProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:_id", getProduct);

export default productRouter;
