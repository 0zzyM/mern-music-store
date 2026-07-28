import type { Request, Response } from "express";
import type { BrandQueryDTO } from "../validation/brandQuerySpecs.js";
import { getBrandBySlug, listBrands } from "../services/brandService.js";

export const getAllBrands = async (req: Request, res: Response) => {
  const dto = req.validatedQuery as BrandQueryDTO;
  const brands = await listBrands(dto.limit);
  res.status(200).json(brands);
};

export const getBrand = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const { slug } = req.params;
  const brand = await getBrandBySlug(slug);
  res.status(200).json(brand);
};
