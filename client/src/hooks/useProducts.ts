import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getProductsFilteredUrl,
} from "../api/products";
import type { ProductQueryParams } from "../types/ProductType";

export const useProducts = (params: ProductQueryParams) =>
  useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 60 * 1000, //1 min
  });

export const useProductsFromUrl = (filters: string) =>
  useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProductsFilteredUrl(filters),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 30 * 1000, //30 secs
  });
