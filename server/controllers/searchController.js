import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";

const PRODUCT_SEARCH_FIELDS =
  "-__v -createdAt -updatedAt -isActive -brand -category -subcategory -amountSold -reviewCount -rating -isFeatured";

const BRAND_SEARCH_FIELDS = "-__v -createdAt -updatedAt -isActive -description";

const CATEGORY_SEARCH_FIELDS =
  "-__v -createdAt -updatedAt -isActive -subcategories -description";

const SUBCATEGORY_SEARCH_FIELDS =
  "-__v -createdAt -updatedAt -isActive -parentCategory -description";

export const getAllSearchResults = async (req, res) => {
  try {
    const { q } = req.query;

    //q.trim().length === 0 in case just spaces etc.
    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: "Search query is required" });
    }

    //Trim was needed otherwise + will be interpreted as a space by any HTTP parser
    const safeQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();

    const regex = new RegExp(safeQuery, "i");

    const productResults = await Product.find(
      {
        name: regex,
        isActive: true,
      },
      PRODUCT_SEARCH_FIELDS,
    );

    //(!productResults) was removed as if none it  will be []
    if (productResults.length === 0) {
      return res.status(404).json({ message: "No matching product found" });
    }

    res.status(200).json(productResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSuggestedSearchResults = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const safeQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();

    const regex = new RegExp(safeQuery, "i");

    const productResults = await Product.find(
      {
        name: regex,
        isActive: true,
      },
      PRODUCT_SEARCH_FIELDS,
    ).limit(5);

    const categoryResults = await Category.find(
      {
        name: regex,
        isActive: true,
      },
      CATEGORY_SEARCH_FIELDS,
    ).limit(2);

    const subcategoryResults = await Subcategory.find(
      {
        name: regex,
        isActive: true,
      },
      SUBCATEGORY_SEARCH_FIELDS,
    ).limit(2);

    const brandResults = await Brand.find(
      {
        name: regex,
        isActive: true,
      },
      BRAND_SEARCH_FIELDS,
    ).limit(3);

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
    res.status(200).json({
      productResults,
      categoryResults,
      subcategoryResults,
      brandResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
