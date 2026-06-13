import { useState } from "react";
import { SearchContext } from "./SearchContext";

export function SearchProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider value={{ isSearching, setIsSearching }}>
      {children}
    </SearchContext.Provider>
  );
}
