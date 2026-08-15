import { fetchApi } from "./fetchApi";
import { SERVER_URL } from "../config";
import type { SearchSuggestions } from "../types/SearchType";
import { ApiError } from "../errors/ApiError";

const EMPTY_SUGGESTIONS: SearchSuggestions = {
  productResults: [],
  categoryResults: [],
  subcategoryResults: [],
  brandResults: [],
};

export const getSearchSuggestions = async (q: string) => {
  try {
    return await fetchApi<SearchSuggestions>(
      `${SERVER_URL}/api/v1/search/suggest?q=${encodeURIComponent(q)}`,
    );
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return EMPTY_SUGGESTIONS;
    }
    throw error;
  }
};
