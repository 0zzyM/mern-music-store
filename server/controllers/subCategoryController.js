import Subcategory from "../models/subcategoryModel.js";

export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await Subcategory.find({ isActive: true });

    if (!subCategories || subCategories.length === 0) {
      return res.status(404).json({ message: "No sub-categories found" });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    const subCategory = await Subcategory.findOne({
      slug: slug,
      isActive: true,
    });

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category was not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
