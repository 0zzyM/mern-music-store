import type { Request, Response } from "express";
import {
  getCategoryBySlug,
  listCategories,
  getCategoryIdBySlug,
} from "../services/categoryService.js";

import { listSubcategoriesByCategory } from "../services/subcategoryService.js";

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await listCategories();
  res.status(200).json(categories);
};

export const getCategory = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const { slug } = req.params;
  const category = await getCategoryBySlug(slug);
  res.status(200).json(category);
};

export const getSubcategoriesByCategory = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const { slug } = req.params;

  const category = await getCategoryIdBySlug(slug);
  const subcategories = await listSubcategoriesByCategory(category._id);

  res.status(200).json(subcategories);
};
