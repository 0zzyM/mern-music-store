import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const inStock = searchParams.get("inStock") === "true";
  const highRated = searchParams.get("highRated") === "true";
  const brandParams = searchParams.get("brand")?.split(",") || [];

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

  const toggleRating = () => {
    highRated
      ? setSearchParams((prev) => {
          prev.delete("highRated");
          return prev;
        })
      : setSearchParams((prev) => {
          prev.set("highRated", "true");
          return prev;
        });
  };

  const toggleBrandFilter = (brand) => {
    const newBrands = brandParams.includes(brand)
      ? brandParams.filter((b) => b !== brand) // remove
      : [...brandParams, brand]; // add

    if (newBrands.length === 0) {
      setSearchParams((prev) => {
        prev.delete("brand");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("brand", newBrands.join(","));
        return prev;
      });
    }
  };

  return {
    inStock,
    toggleStock,
    minPrice,
    maxPrice,
    handleMinPrice,
    handleMaxPrice,
    highRated,
    toggleRating,
    brandParams,
    toggleBrandFilter,
  };
}
