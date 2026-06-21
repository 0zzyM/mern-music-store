import { useState } from "react";
import { SearchContext } from "./SearchContext";

export function SearchProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  return (
    <SearchContext.Provider
      value={{ isSearching, setIsSearching, suggestions, setSuggestions }}
    >
      {children}
    </SearchContext.Provider>
  );
}
