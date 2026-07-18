import express from "express";
import { getAllBrands, getBrand } from "../controllers/brandController.js";

const brandRouter = express.Router();

brandRouter.get("/", getAllBrands);
brandRouter.get("/:slug", getBrand);

export default brandRouter;
