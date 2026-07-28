import { Types } from "mongoose";
import Subcategory from "../models/subcategoryModel.js";
import { NotFoundError } from "../errors/AppError.js";

const PUBLIC_FIELDS = "name slug image description parentCategory";
const PARENT_PUBLIC_FIELDS = "name slug";
const SUBCATEGORY_LIST_FIELDS = "name slug image description";

export const listSubcategories = async () => {
  const subcategories = await Subcategory.find(
    { isActive: true },
    PUBLIC_FIELDS,
  )
    .populate("parentCategory", PARENT_PUBLIC_FIELDS)
    .lean();

  return subcategories;
};

export const getSubcategoryBySlug = async (slug: string) => {
  const subcategory = await Subcategory.findOne(
    {
      slug: slug,
      isActive: true,
    },
    PUBLIC_FIELDS,
  )
    .populate("parentCategory", PARENT_PUBLIC_FIELDS)
    .lean();

  if (!subcategory) {
    throw new NotFoundError("Sub-category was not found");
  }

  return subcategory;
};

export const listSubcategoriesByCategory = async (id: Types.ObjectId) => {
  const subcategories = await Subcategory.find(
    {
      parentCategory: id,
      isActive: true,
    },
    SUBCATEGORY_LIST_FIELDS,
  ).lean();

  return subcategories;
};
