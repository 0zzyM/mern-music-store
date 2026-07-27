import type { Request, Response } from "express";
import { listPromotions } from "../services/promotionService.js";

export const getAllPromotions = async (_req: Request, res: Response) => {
  try {
    const promotions = await listPromotions();

    if (promotions.length === 0) {
      return res.status(404).json({ message: "No promotions found" });
    }

    res.status(200).json(promotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
