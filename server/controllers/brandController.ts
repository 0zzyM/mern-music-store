import type { Request, Response } from "express";
import type { BrandQueryDTO } from "../validation/brandQuerySpecs.js";
import { getBrandBySlug, listBrands } from "../services/brandService.js";

export const getAllBrands = async (req: Request, res: Response) => {
  const dto = req.validatedQuery as BrandQueryDTO;

  try {
    const brands = await listBrands(dto.limit);

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

    const brand = await getBrandBySlug(slug);

    if (!brand) {
      return res.status(404).json({ message: "Brand was not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
