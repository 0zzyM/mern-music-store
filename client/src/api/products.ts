import { fetchApi } from "./fetchApi";
import { ITEMS_PER_PAGE, SERVER_URL } from "../config";
import type {
  ProductResponse,
  ProductQueryParams,
  Product,
} from "../types/ProductType";

export const getProducts = ({
  brand,
  category,
  subcategory,
  sortOption,
  isFeatured,
  limit = ITEMS_PER_PAGE, //Give limit if no limit default to ITEMS_PER_PAGE
}: ProductQueryParams) => {
  let url = `${SERVER_URL}/api/v1/products`;

  let params = "";

  if (sortOption) {
    params += `&sort=${sortOption}`;
  }
  if (brand) {
    params += `&brand=${brand}`;
  }
  if (category) {
    params += `&category=${category}`;
  }
  if (isFeatured) {
    params += `&isFeatured=${isFeatured}`;
  }
  if (subcategory) {
    params += `&subcategory=${subcategory}`;
  }
  params += `&limit=${limit}`;

  if (params) url += "?" + params.substring(1); // removes the 1st char of params not(0) it should be (1)

  return fetchApi<ProductResponse>(`${url}`);
};

export const getProductsFilteredUrl = (filter: string) => {
  const url = `${SERVER_URL}/api/v1/products${filter}`;
  return fetchApi<ProductResponse>(`${url}`);
};

export const getProduct = (id: string) =>
  fetchApi<Product>(`${SERVER_URL}/api/v1/products/${id}`);
