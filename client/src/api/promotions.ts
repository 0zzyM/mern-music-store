import { SERVER_URL } from "../config";
import type { Promotion } from "../types/PromotionType";
import { fetchApi } from "./fetchApi";

export const getPromotions = () =>
  fetchApi<Promotion[]>(`${SERVER_URL}/api/v1/promotions`);
