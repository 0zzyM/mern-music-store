import { fetchApi } from "./fetchApi";
import { SERVER_URL } from "../config";
import type { Brand } from "../types/BrandType";

export const getBrands = (limit: number) =>
  fetchApi<Brand[]>(`${SERVER_URL}/api/v1/brands?limit=${limit}`);
