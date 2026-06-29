import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const inStock = searchParams.get("inStock") === "true";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const minTimerRef = useRef(null);
  const maxTimerRef = useRef(null);

  const handleMinPrice = (value, onError) => {
    clearTimeout(minTimerRef.current);
    minTimerRef.current = setTimeout(() => {
      if (maxPrice && Number(value) > Number(maxPrice)) {
        onError?.();
        return;
      }
      setSearchParams((prev) => {
        prev.set("minPrice", value);
        return prev;
      });
    }, 700);
  };

  const handleMaxPrice = (value, onError) => {
    clearTimeout(maxTimerRef.current);
    maxTimerRef.current = setTimeout(() => {
      if (minPrice && Number(value) < Number(minPrice)) {
        onError?.();
        return;
      }
      setSearchParams((prev) => {
        prev.set("maxPrice", value);
        return prev;
      });
    }, 700);
  };

  const toggleStock = () => {
    inStock
      ? setSearchParams((prev) => {
          prev.delete("inStock");
          return prev;
        })
      : setSearchParams((prev) => {
          prev.set("inStock", "true");
          return prev;
        });
  };

  return {
    inStock,
    toggleStock,
    minPrice,
    maxPrice,
    handleMinPrice,
    handleMaxPrice,
  };
}
