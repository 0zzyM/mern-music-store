import type { Request, Response } from "express";
import { listPromotions } from "../services/promotionService.js";

export const getAllPromotions = async (_req: Request, res: Response) => {
  const promotions = await listPromotions();
  res.status(200).json(promotions);
};
