import type { Request, Response } from "express";
import type {
  SearchQueryDTO,
  SuggestQueryDTO,
} from "../validation/searchQuerySpecs.js";
import {
  listSearchResults,
  listSuggestedSearchResults,
} from "../services/searchService.js";

export const getAllSearchResults = async (req: Request, res: Response) => {
  const dto = req.validatedQuery as SearchQueryDTO;

  const productResults = await listSearchResults(dto.q, dto.limit);

  return res.status(200).json(productResults);
};

//Limit is hardcoded here 5 2 2 3
export const getSuggestedSearchResults = async (
  req: Request,
  res: Response,
) => {
  const dto = req.validatedQuery as SuggestQueryDTO;

  const { productResults, categoryResults, subcategoryResults, brandResults } =
    await listSuggestedSearchResults(dto.q);

  //This is how to return multiple results
  res.status(200).json({
    productResults,
    categoryResults,
    subcategoryResults,
    brandResults,
  });
};
