import type { Request, Response } from "express";
import Promotion from "../models/promotionModel.js";

const PUBLIC_FIELDS = "-__v -createdAt -updatedAt -isActive";

const DEFAULT_SORT = { order: 1 } as const;

export const getAllPromotions = async (_req: Request, res: Response) => {
  try {
    const promotions = await Promotion.find({ isActive: true }, PUBLIC_FIELDS)
      .sort(DEFAULT_SORT)
      .lean();

    if (promotions.length === 0) {
      return res.status(404).json({ message: "No promotions found" });
    }

    res.status(200).json(promotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
