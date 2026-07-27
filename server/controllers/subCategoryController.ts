import type { Request, Response } from "express";
import {
  getSubcategoryBySlug,
  listSubcategories,
} from "../services/subcategoryService.js";

export const getAllSubCategories = async (_req: Request, res: Response) => {
  try {
    const subCategories = await listSubcategories();

    if (subCategories.length === 0) {
      return res.status(404).json({ message: "No sub-categories found" });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubCategory = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  try {
    const { slug } = req.params;

    const subcategory = await getSubcategoryBySlug(slug);

    if (!subcategory) {
      return res.status(404).json({ message: "Sub-category was not found" });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
