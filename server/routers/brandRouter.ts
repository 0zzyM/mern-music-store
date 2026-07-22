import express from "express";
import { getAllBrands, getBrand } from "../controllers/brandController.js";
import { validateQuery } from "../middlewares/queryHandler.js";
import { brandQuerySpecs } from "../validation/brandQuerySpecs.js";

const brandRouter = express.Router();

brandRouter.get("/", validateQuery(brandQuerySpecs), getAllBrands);
brandRouter.get("/:slug", getBrand);

export default brandRouter;
