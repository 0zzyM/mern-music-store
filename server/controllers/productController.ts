import { isValidObjectId, type QueryFilter } from "mongoose";
import Product, { type ProductDoc } from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";
import type { Request, Response } from "express";
import type { ProductListQueryDTO } from "../validation/productQuerySpecs.js";

const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  mostSold: { amountSold: -1 },
  rating: { rating: -1 },
  priceAsc: { price: 1 },
  priceDesc: { price: -1 },
} as const;

type SortKey = keyof typeof SORT_OPTIONS;

const DEFAULT_SORT = { createdAt: 1 } as const;

const PUBLIC_PRODUCT_FIELDS =
  "name price images stock rating reviewCount isOnSale discountAmount isFeatured brand category subcategory details";

const PRODUCT_DETAILED_FIELDS = PUBLIC_PRODUCT_FIELDS + " details description";

const PUBLIC_BRAND_FIELDS = "name slug";
const PUBLIC_CATEGORY_FIELDS = "name slug";
const PUBLIC_SUBCATEGORY_FIELDS = "name slug";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const dto = req.validatedQuery as ProductListQueryDTO;

    // Validation and filteration of the query
    const filter: QueryFilter<ProductDoc> = { isActive: true };

    const sortOption = dto.sort
      ? SORT_OPTIONS[dto.sort as SortKey]
      : DEFAULT_SORT;

    if (dto.category) {
      const requestedCategory = await Category.findOne(
        { slug: dto.category, isActive: true },
        "_id",
      );

      if (!requestedCategory) {
        return res.status(404).json({ message: "Invalid category" }); //404 cause category is not found
      }
      filter.category = requestedCategory._id;
    }

    if (dto.subcategory) {
      const requestedSubcategory = await Subcategory.findOne(
        {
          slug: dto.subcategory,
          isActive: true,
        },
        "_id",
      );
      if (!requestedSubcategory) {
        return res.status(404).json({ message: "Invalid sub-category" });
      }
      filter.subcategory = requestedSubcategory._id;
    }

    if (dto.brand) {
      const requestedBrands = await Brand.find(
        {
          slug: { $in: dto.brand },
          isActive: true,
        },
        "_id",
      );

      if (requestedBrands.length === 0) {
        return res.status(404).json({ message: "Invalid brand" });
      }

      filter.brand = { $in: requestedBrands.map((b) => b._id) };
    }

    if (dto.isFeatured) {
      filter.isFeatured = true;
    }

    //Create empty priceFilter Object
    const priceFilter: { $gte?: number; $lte?: number } = {};
    priceFilter.$gte = dto.minPrice;
    priceFilter.$lte = dto.maxPrice;

    if (Object.keys(priceFilter).length) filter.price = priceFilter;

    // 4 is hardcoded here as the FE only offers 4star and above as an option "boolean"
    if (dto.highRated) filter.rating = { $gte: 4 };

    const LIMIT = dto.limit;
    const SKIP = (dto.page - 1) * dto.limit;
    // Query

    const [products, total] = await Promise.all([
      Product.find(filter, PUBLIC_PRODUCT_FIELDS)
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
      PRODUCT_DETAILED_FIELDS,
    )
      .populate([
        { path: "category", select: PUBLIC_CATEGORY_FIELDS },
        { path: "subcategory", select: PUBLIC_SUBCATEGORY_FIELDS },
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
