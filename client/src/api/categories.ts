import { fetchApi } from "./fetchApi";
import { SERVER_URL } from "../config";
import type { Category } from "../types/CategoryType";

export const getCategories = () =>
  fetchApi<Category[]>(`${SERVER_URL}/api/v1/categories`);
