import express from "express";
import {
  getAllSubCategories,
  getSubCategory,
} from "../controllers/subCategoryController.js";

const subCategoryRouter = express.Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/:slug", getSubCategory);

export default subCategoryRouter;
