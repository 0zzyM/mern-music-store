import { isValidObjectId, type QueryFilter } from "mongoose";
import Product, { type ProductDoc } from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";
import { DEFAULT_PAGE_LIMIT } from "../config/constants.js";
import type { Request, Response } from "express";

const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  mostSold: { amountSold: -1 },
  rating: { rating: -1 },
  priceAsc: { price: 1 },
  priceDesc: { price: -1 },
} as const;

type SortKey = keyof typeof SORT_OPTIONS;

const VALID_SORTS = Object.keys(SORT_OPTIONS);
const DEFAULT_SORT = { createdAt: 1 } as const;

const PUBLIC_FIELDS = "-__v -createdAt -updatedAt -isActive";
const PUBLIC_BRAND_FIELDS = "-__v -createdAt -updatedAt -isActive -description";
const PUBLIC_CATEGORY_FIELDS =
  "-__v -createdAt -updatedAt -isActive -description -subcategories";
const PUBLIC_SUBCATEGORY_FIELDS =
  "-__v -createdAt -updatedAt -isActive -description -parentCategory";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      sort,
      category,
      subcategory,
      brand,
      isFeatured,
      limit,
      minPrice,
      maxPrice,
      highRated,
      page,
    } = req.query;

    // Sort Validation
    if (sort && (typeof sort !== "string" || !VALID_SORTS.includes(sort))) {
      return res.status(400).json({ message: "Invalid sort parameter" });
    }

    // Validation and filteration of the query
    const filter: QueryFilter<ProductDoc> = { isActive: true };

    const sortOption =
      typeof sort === "string" && sort in SORT_OPTIONS
        ? SORT_OPTIONS[sort as SortKey]
        : DEFAULT_SORT; // fall back to default sort which is createdAt: 1

    if (category) {
      if (typeof category !== "string") {
        return res.status(400).json({ message: "Invalid category parameter" });
      }

      const requestedCategory = await Category.findOne(
        { slug: category, isActive: true },
        "_id",
      );

      if (!requestedCategory) {
        return res.status(404).json({ message: "Invalid category" }); //404 cause category is not found
      }
      filter.category = requestedCategory._id;
    }

    if (subcategory) {
      if (typeof subcategory !== "string") {
        return res
          .status(400)
          .json({ message: "Invalid subcategory parameter" });
      }
      const requestedSubcategory = await Subcategory.findOne(
        {
          slug: subcategory,
          isActive: true,
        },
        "_id",
      );
      if (!requestedSubcategory) {
        return res.status(404).json({ message: "Invalid sub-category" });
      }
      filter.subcategory = requestedSubcategory._id;
    }

    if (brand) {
      if (typeof brand !== "string") {
        return res.status(400).json({ message: "Invalid brand parameter" });
      }
      const brandSlugs = brand.split(",");
      const requestedBrands = await Brand.find(
        {
          slug: { $in: brandSlugs },
          isActive: true,
        },
        "_id",
      );

      if (requestedBrands.length === 0) {
        return res.status(404).json({ message: `Invalid brand ${brandSlugs}` });
      }

      filter.brand = { $in: requestedBrands.map((b) => b._id) };
    }

    if (isFeatured === "true") {
      filter.isFeatured = true;
    }

    //Create empty priceFilter Object
    const priceFilter: { $gte?: number; $lte?: number } = {};

    //Check if minPrice and maxPrice inputs are valid and turn the string to Number
    const min = typeof minPrice === "string" ? Number(minPrice) : NaN;
    const max = typeof maxPrice === "string" ? Number(maxPrice) : NaN;

    //If the entry was valid the min and max would be over 0, if invalid not string NaN, and if negative avoided too.
    //! TODO: Do the deeper input validation later on the middleware
    if (min > 0) priceFilter.$gte = min;
    if (max > 0) priceFilter.$lte = max;
    if (Object.keys(priceFilter).length) filter.price = priceFilter;

    // 4 is hardcoded here as the FE only offers 4star and above as an option "boolean"
    if (highRated === "true") filter.rating = { $gte: 4 };

    const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : NaN;
    const parsedPage = typeof page === "string" ? parseInt(page, 10) : NaN;

    const safeLimit =
      Number.isNaN(parsedLimit) || parsedLimit < 0 ? 0 : parsedLimit;
    const safePage =
      Number.isNaN(parsedPage) || parsedPage < 1 ? 0 : parsedPage;

    const LIMIT = safePage ? safeLimit || DEFAULT_PAGE_LIMIT : safeLimit;
    const SKIP = safePage
      ? (safePage - 1) * (safeLimit || DEFAULT_PAGE_LIMIT)
      : 0;

    // Query

    const [products, total] = await Promise.all([
      Product.find(filter, PUBLIC_FIELDS)
        .sort(sortOption)
        .populate([
          { path: "category", select: PUBLIC_CATEGORY_FIELDS },
          { path: "subcategory", select: PUBLIC_SUBCATEGORY_FIELDS },
          { path: "brand", select: PUBLIC_BRAND_FIELDS },
        ])
        .skip(SKIP)
        .limit(LIMIT)
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({ products, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (
  req: Request<{ _id: string }>,
  res: Response,
) => {
  try {
    const { _id } = req.params;

    if (!isValidObjectId(_id)) {
      return res.status(404).json({ message: "Product id is not valid" });
    }

    const product = await Product.findOne(
      {
        _id: _id,
        isActive: true,
      },
      PUBLIC_FIELDS,
    )
      .populate([
        { path: "category", select: PUBLIC_CATEGORY_FIELDS + " -image" },
        { path: "subcategory", select: PUBLIC_SUBCATEGORY_FIELDS + " -image" },
        { path: "brand", select: PUBLIC_BRAND_FIELDS },
      ])
      .lean();

    if (!product) {
      return res.status(404).json({ message: "Product was not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
