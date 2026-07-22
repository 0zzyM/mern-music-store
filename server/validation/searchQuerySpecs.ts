import type { QuerySpec } from "../middlewares/queryHandler.js";

const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 50;

const MIN_LIMIT = 1;
const MAX_LIMIT = 20;
const DEFAULT_SEARCH_LIMIT = 12;

export const searchQuerySpec: QuerySpec = {
  q: {
    type: "string",
    minLength: MIN_QUERY_LENGTH,
    maxLength: MAX_QUERY_LENGTH,
    required: true,
  },
  limit: {
    type: "int",
    min: MIN_LIMIT,
    max: MAX_LIMIT,
    default: DEFAULT_SEARCH_LIMIT,
  },
};

export const suggestQuerySpec: QuerySpec = {
  q: {
    type: "string",
    minLength: MIN_QUERY_LENGTH,
    maxLength: MAX_QUERY_LENGTH,
    required: true,
  },
};

export type SearchQueryDTO = {
  q: string;
  limit: number;
};

export type SuggestQueryDTO = {
  q: string;
};
