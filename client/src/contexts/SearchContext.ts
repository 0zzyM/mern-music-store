import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type SearchContextType = {
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used within a SearchProvider");
  return context;
}
