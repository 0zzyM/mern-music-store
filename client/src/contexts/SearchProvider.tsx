import { useState } from "react";
import { SearchContext } from "./SearchContext";
import type { ReactNode } from "react";

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
