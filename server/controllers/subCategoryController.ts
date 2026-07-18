import Subcategory from "../models/subcategoryModel.js";
import type { Request, Response } from "express";

const PUBLIC_FIELDS = "name slug image description parentCategory";
const PARENT_PUBLIC_FIELDS =
  "-__v -createdAt -updatedAt -isActive -subcategories";

export const getAllSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await Subcategory.find(
      { isActive: true },
      PUBLIC_FIELDS,
    )
      .populate("parentCategory", PARENT_PUBLIC_FIELDS)
      .lean();

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

    const subCategory = await Subcategory.findOne(
      {
        slug: slug,
        isActive: true,
      },
      PUBLIC_FIELDS,
    )
      .populate("parentCategory", PARENT_PUBLIC_FIELDS)
      .lean();

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category was not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
