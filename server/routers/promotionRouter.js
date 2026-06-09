import express from "express";
import { getAllPromotions } from "../controllers/promotionController.js";

const promotionRouter = express.Router();

promotionRouter.get("/", getAllPromotions);

export default promotionRouter;
