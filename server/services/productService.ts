import { isValidObjectId, type QueryFilter } from "mongoose";
import Product, { type ProductDoc } from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import type { ProductListQueryDTO } from "../validation/productQuerySpecs.js";
import { getCategoryIdBySlug } from "./categoryService.js";
import { BadRequestError, NotFoundError } from "../errors/AppError.js";
import { getSubcategoryIdBySlug } from "./subcategoryService.js";

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

// This used to add details as well however product list view depends on it on FE
const PRODUCT_DETAILED_FIELDS = PUBLIC_PRODUCT_FIELDS + " description";

const PUBLIC_BRAND_FIELDS = "name slug";
const PUBLIC_CATEGORY_FIELDS = "name slug";
const PUBLIC_SUBCATEGORY_FIELDS = "name slug";

export const listProducts = async (dto: ProductListQueryDTO) => {
  // Validation and filteration of the query
  const filter: QueryFilter<ProductDoc> = { isActive: true };

  const sortOption = dto.sort
    ? SORT_OPTIONS[dto.sort as SortKey]
    : DEFAULT_SORT;

  if (dto.category) {
    //calls categoryService
    const requestedCategoryId = await getCategoryIdBySlug(dto.category);
    filter.category = requestedCategoryId;
  }

  if (dto.subcategory) {
    const requestedSubcategoryId = await getSubcategoryIdBySlug(
      dto.subcategory,
    );
    filter.subcategory = requestedSubcategoryId;
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
      throw new NotFoundError("Brand was not found");
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

  return { products, total };
};

export const getProductById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Product ID is not valid.");
  }
  const product = await Product.findOne(
    {
      _id: id,
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
    throw new NotFoundError("Product was not found");
  }

  return product;
};
