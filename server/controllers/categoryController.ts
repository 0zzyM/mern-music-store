import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import type { Request, Response } from "express";

const PUBLIC_FIELDS = "name slug image description subcategories";
const PUBLIC_SUBCATEGORY_FIELDS = "name slug";
const SUBCATEGORY_LIST_FIELDS = "name slug image description";
const DEFAULT_SORT = { createdAt: 1 } as const;

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find(
      {
        isActive: true,
      },
      PUBLIC_FIELDS,
    )
      .sort(DEFAULT_SORT)
      .populate("subcategories", PUBLIC_SUBCATEGORY_FIELDS)
      .lean();

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

    const category = await Category.findOne(
      {
        slug: slug,
        isActive: true,
      },
      PUBLIC_FIELDS,
    )
      .populate("subcategories", PUBLIC_SUBCATEGORY_FIELDS)
      .lean(); // Added populate to return full subcat data exc created updated dates instead of just the object id
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
    const category = await Category.findOne(
      {
        slug: slug,
        isActive: true,
      },
      "_id",
    ).lean();

    if (!category) {
      return res.status(404).json({ message: "Category was not found" });
    }

    const subcategories = await Subcategory.find(
      {
        parentCategory: category._id,
        isActive: true,
      },
      SUBCATEGORY_LIST_FIELDS,
    ).lean();

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
