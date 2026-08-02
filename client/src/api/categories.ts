import { fetchApi } from "./fetchApi";
import { SERVER_URL } from "../config";
import type { Category } from "../types/CategoryType";
import type { Subcategory } from "../types/SubcategoryType";

export const getCategories = () =>
  fetchApi<Category[]>(`${SERVER_URL}/api/v1/categories`);

export const getSubcategoriesOfCategory = (category_slug: string) =>
  fetchApi<Subcategory[]>(
    `${SERVER_URL}/api/v1/categories/${category_slug}/subcategories`,
  );
