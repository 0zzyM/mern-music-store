import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import type { Request, Response } from "express";
import type {
  SearchQueryDTO,
  SuggestQueryDTO,
} from "../validation/searchQuerySpecs.js";

const PRODUCT_SEARCH_FIELDS = "name images price stock isOnSale discountAmount";

const BRAND_SEARCH_FIELDS = "name slug image";

const CATEGORY_SEARCH_FIELDS = "name slug image";

const SUBCATEGORY_SEARCH_FIELDS = "name slug image";

export const getAllSearchResults = async (req: Request, res: Response) => {
  try {
    const dto = req.validatedQuery as SearchQueryDTO;

    const safeQuery = dto.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();

    const regex = new RegExp(safeQuery, "i");

    const productResults = await Product.find(
      {
        name: regex,
        isActive: true,
      },
      PRODUCT_SEARCH_FIELDS,
    )
      .limit(dto.limit)
      .lean();

    //(!productResults) was removed as if none it  will be []
    if (productResults.length === 0) {
      return res.status(404).json({ message: "No matching product found" });
    }

    return res.status(200).json(productResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//Limit is hardcoded here 5 2 2 3
export const getSuggestedSearchResults = async (
  req: Request,
  res: Response,
) => {
  try {
    const dto = req.validatedQuery as SuggestQueryDTO;

    const safeQuery = dto.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();

    const regex = new RegExp(safeQuery, "i");

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

    // Check any search  results exist  for any schema, FE can handle [] and show no result
    const hasResults =
      productResults.length > 0 ||
      categoryResults.length > 0 ||
      subcategoryResults.length > 0 ||
      brandResults.length > 0;

    if (!hasResults) {
      return res.status(404).json({ message: "No results found" });
    }

    //This is how to return multiple results
    return res.status(200).json({
      productResults,
      categoryResults,
      subcategoryResults,
      brandResults,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
