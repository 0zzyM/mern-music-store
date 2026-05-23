import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";

const VALID_SORTS = ["mostSold", "newest", "rating", "priceAsc", "priceDesc"];
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
    const { sort, category, subcategory, brand, isFeatured } = req.query;

    // Sort Validation
    if (sort && !VALID_SORTS.includes(sort)) {
      return res.status(400).json({ message: "Invalid sort parameter" });
    }

    // Validation and filteration of the query
    const filter = { isActive: true };

    const sortOption = SORT_OPTIONS[sort] || {}; // default to no sort

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

    // Query
    const products = await Product.find(filter, PUBLIC_FIELDS)
      .sort(sortOption)
      .populate("brand", PUBLIC_BRAND_FIELDS)
      .populate("category", PUBLIC_CATEGORY_FIELDS)
      .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
