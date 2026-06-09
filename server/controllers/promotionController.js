import Promotion from "../models/promotionModel.js";

const PUBLIC_FIELDS = "-__v -createdAt -updatedAt -isActive";

const DEFAULT_SORT = { order: 1 };

export const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find(
      { isActive: true },
      PUBLIC_FIELDS,
    ).sort(DEFAULT_SORT);

    if (!promotions || promotions.length === 0) {
      return res.status(404).json({ message: "No promotions found" });
    }

    res.status(200).json(promotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
