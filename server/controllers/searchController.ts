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
  try {
    const dto = req.validatedQuery as SearchQueryDTO;

    const productResults = await listSearchResults(dto.q, dto.limit);

    //(!productResults) was removed as if none it  will be []
    if (productResults.length === 0) {
      return res.status(404).json({ message: "No matching product found" });
    }

    return res.status(200).json(productResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//Limit is hardcoded here 5 2 2 3
export const getSuggestedSearchResults = async (
  req: Request,
  res: Response,
) => {
  try {
    const dto = req.validatedQuery as SuggestQueryDTO;

    const {
      productResults,
      categoryResults,
      subcategoryResults,
      brandResults,
    } = await listSuggestedSearchResults(dto.q);

    // Check any search  results exist  for any schema, FE can handle [] and show no result
    const hasResults =
      productResults.length > 0 ||
      categoryResults.length > 0 ||
      subcategoryResults.length > 0 ||
      brandResults.length > 0;

    if (!hasResults) {
      return res.status(404).json({ message: "No results found" });
    }

    //This is how to return multiple results
    return res.status(200).json({
      productResults,
      categoryResults,
      subcategoryResults,
      brandResults,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
