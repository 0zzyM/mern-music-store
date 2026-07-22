import type { QuerySpec } from "../middlewares/queryHandler.js";

const MIN_LIMIT = 1;
const MAX_LIMIT = 50; // At the moment it is useless cause there are 21 brands seeded at this very point
const DEFAULT_BRAND_LIMIT = 12;

export const brandQuerySpecs: QuerySpec = {
  limit: {
    type: "int",
    min: MIN_LIMIT,
    max: MAX_LIMIT,
    default: DEFAULT_BRAND_LIMIT,
  },
};

export type BrandQueryDTO = {
  limit: number;
};
