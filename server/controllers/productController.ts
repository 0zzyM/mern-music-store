import type { Request, Response } from "express";
import type { ProductListQueryDTO } from "../validation/productQuerySpecs.js";
import { getProductById, listProducts } from "../services/productService.js";

export const getProducts = async (req: Request, res: Response) => {
  const dto = req.validatedQuery as ProductListQueryDTO;
  const { products, total } = await listProducts(dto);
  res.status(200).json({ products, total });
};

export const getProduct = async (
  req: Request<{ _id: string }>,
  res: Response,
) => {
  const { _id } = req.params;

  const product = await getProductById(_id);

  res.status(200).json(product);
};
