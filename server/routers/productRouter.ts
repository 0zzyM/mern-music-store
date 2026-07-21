import express from "express";
import { getProducts, getProduct } from "../controllers/productController.js";
import { validateProductQuery } from "../middlewares/queryHandler.js";

const productRouter = express.Router();

productRouter.get("/", validateProductQuery, getProducts);
productRouter.get("/:_id", getProduct);

export default productRouter;
