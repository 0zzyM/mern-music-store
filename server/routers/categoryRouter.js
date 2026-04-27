import express from "express";
import {
  getCategory,
  getAllCategories,
  getSubcategoriesByCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:slug", getCategory);
categoryRouter.get("/:slug/subcategories", getSubcategoriesByCategory);

export default categoryRouter;
