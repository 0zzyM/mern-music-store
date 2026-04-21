import Product from "../models/productModel.js";
const VALID_SORTS = ["mostSold", "newest", "rating"];

export const getAllProducts = async (req, res) => {
  try {
    const { sort } = req.query; // Same as (const sort = req.query.sort)

    if (sort && !VALID_SORTS.includes(sort)) {
      return res.status(400).json({ message: "Invalid sort parameter" });
    }

    let products;

    if (sort === "mostSold") {
      products = await Product.find().sort({ amountSold: -1 });
    } else if (sort === "newest") {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (sort === "rating") {
      products = await Product.find().sort({ rating: -1 });
    } else {
      products = await Product.find();
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
    const featuredProducts = await Product.find({ isFeatured: true });

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
    const category = req.params.category;

    const productsByCategory = await Product.find({ category: category });

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
    const category = req.params.category;

    const featuredByCategory = await Product.find({
      category: category,
      isFeatured: true,
    });

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
