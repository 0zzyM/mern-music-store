import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";
import Brand from "../models/brandModel.js";

const VALID_SORTS = ["mostSold", "newest", "rating"];
const SORT_OPTIONS = {
  mostSold: { amountSold: -1 },
  newest: { createdAt: -1 },
  rating: { rating: -1 },
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
      const requestedBrand = await Brand.findOne({ slug: brand });
      if (!requestedBrand) {
        return res.status(404).json({ message: "Invalid brand" });
      }
      filter.brand = requestedBrand._id;
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
{
  /*
export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find(
      { isFeatured: true },
      PUBLIC_FIELDS,
    )
      .populate("brand", PUBLIC_BRAND_FIELDS)
      .populate("category", PUBLIC_CATEGORY_FIELDS)
      .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);

    if (!featuredProducts || featuredProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getProductsByCategory = async (req, res) => {
  try {
    const category_slug = req.params.category;

    const category = await Category.findOne({ slug: category_slug });

    const productsByCategory = await Product.find(
      { category: category },
      PUBLIC_FIELDS,
    )
      .populate("brand", PUBLIC_BRAND_FIELDS)
      .populate("category", PUBLIC_CATEGORY_FIELDS)
      .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);

    if (!productsByCategory || productsByCategory.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found on this category" });
    }
    res.status(200).json(productsByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}
export const getFeaturedProductsByCategory = async (req, res) => {
  try {
    const category_slug = req.params.category;

    const category = await Category.findOne({ slug: category_slug });

    const featuredByCategory = await Product.find(
      {
        category: category,
        isFeatured: true,
      },
      PUBLIC_FIELDS,
    )
      .populate("brand", PUBLIC_BRAND_FIELDS)
      .populate("category", PUBLIC_CATEGORY_FIELDS)
      .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);

    if (!featuredByCategory || featuredByCategory.length === 0) {
      return res
        .status(404)
        .json({ message: "No featured products found on this category" });
    }

    res.status(200).json(featuredByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
};
 */
}
