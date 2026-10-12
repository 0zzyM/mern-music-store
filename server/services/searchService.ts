import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import { NotFoundError } from "../errors/AppError.js";

const PRODUCT_SEARCH_FIELDS = "name images price stock isOnSale discountAmount";

const BRAND_SEARCH_FIELDS = "name slug image";

const CATEGORY_SEARCH_FIELDS = "name slug image";

const SUBCATEGORY_SEARCH_FIELDS = "name slug image";

export const listSearchResults = async (q: string, limit: number) => {
  const safeQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();
  const regex = new RegExp(safeQuery, "i");

  const productResults = await Product.find(
    {
      name: regex,
      isActive: true,
    },
    PRODUCT_SEARCH_FIELDS,
  )
    .limit(limit)
    .lean();

  return productResults;
};

export const listSuggestedSearchResults = async (q: string) => {
  const safeQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();
  const regex = new RegExp(safeQuery, "i");

  // promise returns null or value if null during building the obj
  // if any of them doesn't have a result it will be an empty array
  const [productResults, categoryResults, subcategoryResults, brandResults] =
    await Promise.all([
      Product.find(
        {
          name: regex,
          isActive: true,
        },
        PRODUCT_SEARCH_FIELDS,
      )
        .limit(5)
        .lean(),

      Category.find(
        {
          name: regex,
          isActive: true,
        },
        CATEGORY_SEARCH_FIELDS,
      )
        .limit(2)
        .lean(),

      Subcategory.find(
        {
          name: regex,
          isActive: true,
        },
        SUBCATEGORY_SEARCH_FIELDS,
      )
        .limit(2)
        .lean(),

      Brand.find(
        {
          name: regex,
          isActive: true,
        },
        BRAND_SEARCH_FIELDS,
      )
        .limit(3)
        .lean(),
    ]);

  return { productResults, categoryResults, subcategoryResults, brandResults };
};
