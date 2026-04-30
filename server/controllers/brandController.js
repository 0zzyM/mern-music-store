import Brand from "../models/brandModel.js";

const PUBLIC_FIELDS = "-__v -createdAt -updatedAt -isActive";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }, PUBLIC_FIELDS);

    if (!brands) {
      return res.status(404).json({ message: "No brands found" });
    }

    res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBrand = async (req, res) => {
  try {
    const { slug } = req.params;

    const brand = await Brand.findOne(
      { slug: slug, isActive: true },
      PUBLIC_FIELDS,
    );

    if (!brand || brand == undefined) {
      return res.status(404).json({ message: "Brand was not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
