import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const inStock = searchParams.get("inStock") === "true";
  const highRated = searchParams.get("highRated") === "true";
  const brandParams = searchParams.get("brand")?.split(",") || [];

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = Number(searchParams.get("page")) || 1;

  const minTimerRef = useRef(null);
  const maxTimerRef = useRef(null);

  const subcategory = searchParams.get("subcategory");
  const category = searchParams.get("category");
  const filters = searchParams.toString() ? `?${searchParams.toString()}` : "";

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

  // Pagination Functions

  const goToNextPage = (noOfPages) => {
    setSearchParams((prev) => {
      if (page === noOfPages) return prev;
      else {
        prev.set("page", page + 1);
        return prev;
      }
    });
  };

  const goToPrevPage = () => {
    setSearchParams((prev) => {
      if (page <= 1) return prev;
      else {
        prev.set("page", page - 1);
        return prev;
      }
    });
  };

  const goToFirstPage = () => {
    setSearchParams((prev) => {
      prev.set("page", 1);
      return prev;
    });
  };

  const goToLastPage = (noOfPages) => {
    setSearchParams((prev) => {
      prev.set("page", Number(noOfPages));
      return prev;
    });
  };

  const goToPage = (pageNumber) => {
    setSearchParams((prev) => {
      prev.set("page", pageNumber);
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
    highRated,
    toggleRating,
    brandParams,
    toggleBrandFilter,
    page,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    goToPage,
    subcategory,
    category,
    filters,
  };
}
