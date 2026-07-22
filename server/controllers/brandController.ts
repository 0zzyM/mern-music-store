import Brand from "../models/brandModel.js";
import type { Request, Response } from "express";
import type { BrandQueryDTO } from "../validation/brandQuerySpecs.js";

const PUBLIC_FIELDS = "name slug image description";

const DEFAULT_SORT = { createdAt: 1 } as const;

export const getAllBrands = async (req: Request, res: Response) => {
  const dto = req.validatedQuery as BrandQueryDTO;

  try {
    const brands = await Brand.find({ isActive: true }, PUBLIC_FIELDS)
      .sort(DEFAULT_SORT)
      .limit(dto.limit)
      .lean();

    if (brands.length === 0) {
      return res.status(404).json({ message: "No brands found" });
    }

    res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBrand = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  try {
    const { slug } = req.params;

    const brand = await Brand.findOne(
      { slug: slug, isActive: true },
      PUBLIC_FIELDS,
    ).lean();

    if (!brand) {
      return res.status(404).json({ message: "Brand was not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
