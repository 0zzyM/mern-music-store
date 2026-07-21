import type { Request, Response, NextFunction } from "express";
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

// TODO: When auth is ready admin should be able to call ALL with limit = 0
type IntRule = { type: "int"; min: number; max: number; default: number };
type NumberRule = { type: "number"; min: number; max: number; default: number };
type BoolRule = { type: "boolean" };
type EnumRule = { type: "enum"; values: readonly string[] };
type ListRule = { type: "list"; values: readonly string[]; maxItems: number };

export type productQuery = {
  limit?: IntRule;
  page?: IntRule;
  minPrice?: NumberRule;
  maxPrice?: NumberRule;
  isFeatured?: BoolRule;
  highRated?: BoolRule;
  sort?: EnumRule;
  category?: EnumRule;
  subcategory?: EnumRule;
  brand?: ListRule;
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

const productQuerySpecs: productQuery = {
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

export const validateProductQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const dto: Record<string, unknown> = {};

  for (const [key, rule] of Object.entries(productQuerySpecs)) {
    const qry = req.query[key];

    // if default is absent like isFeatured shouldn't assign anything
    if (!qry) {
      if ("default" in rule) dto[key] = rule.default;
      continue;
    }

    if (typeof qry !== "string") {
      return res
        .status(400)
        .json({ message: `Invalid request ${key}, it can only be a string` });
    }

    switch (rule.type) {
      case "int": {
        const parsedQry = parseInt(qry, 10);

        if (Number.isNaN(parsedQry) || parsedQry < rule.min) {
          return res
            .status(400)
            .json({ message: `Invalid request ${key} parameter was called` });
        }

        dto[key] = Math.min(parsedQry, rule.max);

        break;
      }

      case "number": {
        const parsedQry = Number(qry);

        if (Number.isNaN(parsedQry) || parsedQry < rule.min) {
          return res
            .status(400)
            .json({ message: `Invalid ${key} parameter was called` });
        }

        dto[key] = Math.min(parsedQry, rule.max);

        break;
      }

      case "boolean": {
        dto[key] = qry === "true";
        break;
      }

      case "enum": {
        if (rule.values.includes(qry)) {
          dto[key] = qry;
        } else {
          return res
            .status(400)
            .json({ message: `Invalid ${key} parameter was called` });
        }
        break;
      }

      case "list": {
        const items = qry.split(",");
        if (items.length > rule.maxItems) {
          return res.status(400).json({ message: `Too many ${key} values` });
        }
        if (items.some((item) => !rule.values.includes(item))) {
          return res.status(400).json({ message: `Invalid ${key} parameter` });
        }
        dto[key] = items;
        break;
      }
    }
  }

  req.validatedQuery = dto;

  next();
};
