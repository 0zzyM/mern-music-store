import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import type { ProductQueryParams } from "../types/ProductType";

export const useProducts = (params: ProductQueryParams) =>
  useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 60 * 1000, //1 min
  });
