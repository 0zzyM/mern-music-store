import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";
import { DEFAULT_PAGE_LIMIT } from "../config/constants.js";

const VALID_SORTS = ["mostSold", "newest", "rating", "priceAsc", "priceDesc"];
const DEFAULT_SORT = { createdAt: 1 };
const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  mostSold: { amountSold: -1 },
  rating: { rating: -1 },
  priceAsc: { price: 1 },
  priceDesc: { price: -1 },
};
const PUBLIC_FIELDS = "-__v -createdAt -updatedAt -isActive";
const PUBLIC_BRAND_FIELDS = "-__v -createdAt -updatedAt -isActive -description";
const PUBLIC_CATEGORY_FIELDS =
  "-__v -createdAt -updatedAt -isActive -description -subcategories";
const PUBLIC_SUBCATEGORY_FIELDS =
  "-__v -createdAt -updatedAt -isActive -description -parentCategory";

export const getProducts = async (req, res) => {
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
    if (sort && !VALID_SORTS.includes(sort)) {
      return res.status(400).json({ message: "Invalid sort parameter" });
    }

    // Validation and filteration of the query
    const filter = { isActive: true };

    const sortOption = SORT_OPTIONS[sort] || DEFAULT_SORT; // fall back to default sort which is createdAt: 1

    if (category) {
      const requestedCategory = await Category.findOne({ slug: category });
      if (!requestedCategory) {
        return res.status(404).json({ message: "Invalid category" }); //404 cause category is not found
      }
      filter.category = requestedCategory._id;
    }

    if (subcategory) {
      const requestedSubcategory = await Subcategory.findOne({
        slug: subcategory,
      });
      if (!requestedSubcategory) {
        return res.status(404).json({ message: "Invalid sub-category" });
      }
      filter.subcategory = requestedSubcategory._id;
    }

    if (brand) {
      const brandSlugs = brand.split(",");
      const requestedBrands = await Brand.find({ slug: { $in: brandSlugs } });

      if (requestedBrands.length === 0) {
        return res.status(404).json({ message: `Invalid brand ${brandSlugs}` });
      }

      filter.brand = { $in: requestedBrands.map((b) => b._id) };
    }

    if (isFeatured === "true") {
      filter.isFeatured = true;
    }

    const priceFilter = {};
    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);
    if (Object.keys(priceFilter).length) filter.price = priceFilter;

    // 4 is hardcoded here as the FE only offers 4star and above as an option "boolean"
    if (highRated === "true") filter.rating = { $gte: 4 };

    const LIMIT = page
      ? parseInt(limit) || DEFAULT_PAGE_LIMIT
      : parseInt(limit) || 0;

    const SKIP = page
      ? (Number(page) - 1) * Number(limit || DEFAULT_PAGE_LIMIT)
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
        .limit(LIMIT),
      Product.countDocuments(filter),
    ]);

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    if (products.length === 0) {
      return res.status(200).json({ products: [], total: 0 });
    }

    res.status(200).json({ products, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { _id } = req.params;

    const product = await Product.findOne(
      {
        _id: _id,
        isActive: true,
      },
      PUBLIC_FIELDS,
    ).populate([
      { path: "category", select: PUBLIC_CATEGORY_FIELDS + " -image" },
      { path: "subcategory", select: PUBLIC_SUBCATEGORY_FIELDS + " -image" },
      { path: "brand", select: PUBLIC_BRAND_FIELDS },
    ]); // No populate as brand-category fields does not seem to be required

    if (!product) {
      return res.status(404).json({ message: "Product was not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
