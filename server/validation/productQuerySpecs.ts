import type { QuerySpec } from "../middlewares/queryHandler.js";

import {
  BRAND_SLUGS,
  CATEGORY_MAP,
  DEFAULT_PAGE_LIMIT,
  SORT_OPTIONS,
} from "../config/constants.js";

const VALID_SORTS = Object.keys(SORT_OPTIONS);

const MIN_LIMIT = 1;
const MAX_LIMIT = 20;

const MAX_PAGE = 10000;
const MAX_PRICE = 10000000;

export const productQuerySpecs: QuerySpec = {
  limit: {
    type: "int",
    min: MIN_LIMIT,
    max: MAX_LIMIT,
    default: DEFAULT_PAGE_LIMIT,
  },
  page: {
    type: "int",
    min: 1,
    max: MAX_PAGE,
    default: 1,
  },
  minPrice: {
    type: "number",
    min: 0,
    max: MAX_PRICE,
    default: 0,
  },
  maxPrice: {
    type: "number",
    min: 10,
    max: MAX_PRICE,
    default: MAX_PRICE,
  },
  isFeatured: {
    type: "boolean",
  },
  highRated: {
    type: "boolean",
  },
  sort: {
    type: "enum",
    values: VALID_SORTS,
  },
  brand: { type: "list", values: BRAND_SLUGS, maxItems: 20 },
  category: { type: "enum", values: Object.keys(CATEGORY_MAP) },
  subcategory: { type: "enum", values: Object.values(CATEGORY_MAP).flat() },
};

export type ProductListQueryDTO = {
  limit: number;
  page: number;
  minPrice: number;
  maxPrice: number;
  isFeatured?: boolean;
  highRated?: boolean;
  sort?: string;
  category?: string;
  subcategory?: string;
  brand?: string[];
};
