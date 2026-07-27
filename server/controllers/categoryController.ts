import type { Request, Response } from "express";
import {
  getCategoryBySlug,
  listCategories,
  getCategoryIdBySlug,
} from "../services/categoryService.js";

import { listSubcategoriesByCategory } from "../services/subcategoryService.js";

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await listCategories();

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategory = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  try {
    const { slug } = req.params;

    const category = await getCategoryBySlug(slug);
    if (!category) {
      return res.status(404).json({ message: "Category was not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubcategoriesByCategory = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  try {
    const { slug } = req.params;

    const category = await getCategoryIdBySlug(slug);

    if (!category) {
      return res.status(404).json({ message: "Category was not found" });
    }

    const subcategories = await listSubcategoriesByCategory(category._id);

    if (subcategories.length === 0) {
      return res
        .status(404)
        .json({ message: "No subcategories found for this category" });
    }

    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
