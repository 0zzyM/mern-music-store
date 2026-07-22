import express from "express";
import { getProducts, getProduct } from "../controllers/productController.js";
import { validateQuery } from "../middlewares/queryHandler.js";
import { productQuerySpecs } from "../validation/productQuerySpecs.js";

const productRouter = express.Router();

productRouter.get("/", validateQuery(productQuerySpecs), getProducts);
productRouter.get("/:_id", getProduct);

export default productRouter;
