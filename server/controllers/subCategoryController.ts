import type { Request, Response } from "express";
import {
  getSubcategoryBySlug,
  listSubcategories,
} from "../services/subcategoryService.js";

export const getAllSubCategories = async (_req: Request, res: Response) => {
  const subcategories = await listSubcategories();

  res.status(200).json(subcategories);
};

export const getSubCategory = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const { slug } = req.params;

  const subcategory = await getSubcategoryBySlug(slug);

  res.status(200).json(subcategory);
};
