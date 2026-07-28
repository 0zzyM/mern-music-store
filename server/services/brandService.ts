import { NotFoundError } from "../errors/AppError.js";
import Brand from "../models/brandModel.js";

const PUBLIC_FIELDS = "name slug image description";

const DEFAULT_SORT = { createdAt: 1 } as const;

export const listBrands = async (limit: number) => {
  const brands = await Brand.find({ isActive: true }, PUBLIC_FIELDS)
    .sort(DEFAULT_SORT)
    .limit(limit)
    .lean();

  return brands;
};

export const getBrandBySlug = async (slug: string) => {
  const brand = await Brand.findOne(
    { slug: slug, isActive: true },
    PUBLIC_FIELDS,
  ).lean();

  if (!brand) {
    throw new NotFoundError("Brand was not found");
  }

  return brand;
};
