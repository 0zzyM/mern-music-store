import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
const VALID_SORTS = ["mostSold", "newest", "rating"];
const PUBLIC_FIELDS = "-__v -createdAt -updatedAt -isActive";
const PUBLIC_BRAND_FIELDS = "-__v -createdAt -updatedAt -isActive -description";
const PUBLIC_CATEGORY_FIELDS =
  "-__v -createdAt -updatedAt -isActive -description -subcategories";
const PUBLIC_SUBCATEGORY_FIELDS =
  "-__v -createdAt -updatedAt -isActive -description -parentCategory";

export const getAllProducts = async (req, res) => {
  try {
    const { sort } = req.query; // Same as (const sort = req.query.sort)

    if (sort && !VALID_SORTS.includes(sort)) {
      return res.status(400).json({ message: "Invalid sort parameter" });
    }

    let products;

    if (sort === "mostSold") {
      products = await Product.find({ isActive: true }, PUBLIC_FIELDS)
        .sort({ amountSold: -1 })
        .populate("brand", PUBLIC_BRAND_FIELDS)
        .populate("category", PUBLIC_CATEGORY_FIELDS)
        .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);
    } else if (sort === "newest") {
      products = await Product.find({ isActive: true }, PUBLIC_FIELDS)
        .sort({
          createdAt: -1,
        })
        .populate("brand", PUBLIC_BRAND_FIELDS)
        .populate("category", PUBLIC_CATEGORY_FIELDS)
        .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);
    } else if (sort === "rating") {
      products = await Product.find({ isActive: true }, PUBLIC_FIELDS)
        .sort({
          rating: -1,
        })
        .populate("brand", PUBLIC_BRAND_FIELDS)
        .populate("category", PUBLIC_CATEGORY_FIELDS)
        .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);
    } else {
      products = await Product.find({ isActive: true }, PUBLIC_FIELDS)
        .populate("brand", PUBLIC_BRAND_FIELDS)
        .populate("category", PUBLIC_CATEGORY_FIELDS)
        .populate("subcategory", PUBLIC_SUBCATEGORY_FIELDS);
    }

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
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
};
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
