import Promotion from "../models/promotionModel.js";

const PUBLIC_FIELDS = "title subtitle image ctaText ctaLink order";

const DEFAULT_SORT = { order: 1 } as const;

export const listPromotions = async () => {
  const promotions = await Promotion.find({ isActive: true }, PUBLIC_FIELDS)
    .sort(DEFAULT_SORT)
    .lean();

  return promotions;
};
