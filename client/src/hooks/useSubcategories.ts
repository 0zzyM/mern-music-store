import { useQuery } from "@tanstack/react-query";
import { getSubcategoriesOfCategory } from "../api/categories";
import { getSubcategories } from "../api/subcategories";

export const useSubcategories = () =>
  useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
    staleTime: Infinity,
  });

export const useSubcategoriesOfCategory = (category_slug: string) =>
  useQuery({
    queryKey: ["subcategories", category_slug],
    queryFn: () => getSubcategoriesOfCategory(category_slug),
    staleTime: Infinity,
  });
