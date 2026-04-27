import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      slug: slug,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Category was not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({
      slug: slug,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Category was not found" });
    }

    const subcategories = await Subcategory.find({
      parentCategory: category._id,
      isActive: true,
    });

    if (subcategories.length === 0) {
      return res
        .status(404)
        .json({ message: "No subcategories found for this category" });
    }

    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
