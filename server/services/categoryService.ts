import { NotFoundError } from "../errors/AppError.js";
import Category from "../models/categoryModel.js";

const PUBLIC_FIELDS = "name slug image description subcategories";
const PUBLIC_SUBCATEGORY_FIELDS = "name slug";
const DEFAULT_SORT = { createdAt: 1 } as const;

export const listCategories = async () => {
  const categories = await Category.find(
    {
      isActive: true,
    },
    PUBLIC_FIELDS,
  )
    .sort(DEFAULT_SORT)
    .populate("subcategories", PUBLIC_SUBCATEGORY_FIELDS)
    .lean();

  return categories;
};

export const getCategoryBySlug = async (slug: string) => {
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
    throw new NotFoundError("Category was not found");
  }
  return category;
};

export const getCategoryIdBySlug = async (slug: string) => {
  const category = await Category.findOne(
    {
      slug: slug,
      isActive: true,
    },
    "_id",
  ).lean();

  if (!category) {
    throw new NotFoundError("Category ID not found");
  }

  return category;
};
