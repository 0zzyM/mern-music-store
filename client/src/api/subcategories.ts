import { fetchApi } from "./fetchApi";
import { SERVER_URL } from "../config";
import type { Subcategory } from "../types/SubcategoryType";

export const getSubcategories = () =>
  fetchApi<Subcategory[]>(`${SERVER_URL}/api/v1/subcategories`);
