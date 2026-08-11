import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

//FIXME: BUG methods don't reset the pagination!!!!

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const inStock = searchParams.get("inStock") === "true";
  const highRated = searchParams.get("highRated") === "true";
  const brandParams = searchParams.get("brand")?.split(",") || [];

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = Number(searchParams.get("page")) || 1;

  const minTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const subcategory = searchParams.get("subcategory");
  const category = searchParams.get("category");
  const filters = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const handleMinPrice = (value: string, onError?: () => void) => {
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

  /* Forget and confused once already onError is passing this on PriceFilter
      handleMinPrice(e.target.value, () => {
              setLocalMin(minPrice ?? "");
              setErr("Minimum price can't be higher than maximum price");
            });*/

  const handleMaxPrice = (value: string, onError?: () => void) => {
    clearTimeout(maxTimerRef.current); //debounce every key stroke

    // schedules the task with 700ms
    // validate the input if smaller then min price
    // onError runs and returns

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
    if (inStock) {
      setSearchParams((prev) => {
        prev.delete("inStock");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("inStock", "true");
        return prev;
      });
    }
  };

  const toggleRating = () => {
    if (highRated) {
      setSearchParams((prev) => {
        prev.delete("highRated");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("highRated", "true");
        return prev;
      });
    }
  };

  const toggleBrandFilter = (brand: string) => {
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

  const goToNextPage = (noOfPages: number) => {
    setSearchParams((prev) => {
      if (page === noOfPages) return prev;
      else {
        prev.set("page", String(page + 1));
        return prev;
      }
    });
  };

  const goToPrevPage = () => {
    setSearchParams((prev) => {
      if (page <= 1) return prev;
      else {
        prev.set("page", String(page - 1));
        return prev;
      }
    });
  };

  const goToFirstPage = () => {
    setSearchParams((prev) => {
      prev.set("page", "1");
      return prev;
    });
  };

  const goToLastPage = (noOfPages: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(noOfPages));
      return prev;
    });
  };

  const goToPage = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(pageNumber));
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
