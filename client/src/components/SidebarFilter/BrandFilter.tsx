import { FiSearch } from "react-icons/fi";
import { useFilters } from "../../hooks/useFilters.js";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useBrands } from "../../hooks/useBrands.js";

export default function BrandFilter() {
  const { brandParams, toggleBrandFilter } = useFilters();
  const [query, setQuery] = useState("");

  const changeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //TODO: Used 999 as a workaround limit should be on FE not on fetch figure out later here.
  const { data: brands, isPending, isError } = useBrands(999);

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p>Error fetching brands</p>;

  const filteredBrands =
    brands?.filter((brand) =>
      brand.name.toLowerCase().includes(query.toLowerCase()),
    ) || [];

  if (!brands) return <p>Loading...</p>;

  return (
    <div className="sidebar-brand-filter">
      <h3>Brands</h3>
      <div className="filter-content">
        <FiSearch className="filter-search-icon" />

        <input
          type="text"
          className="brand-filter-search"
          placeholder="Search for a brand"
          onChange={changeQuery}
          aria-label="Search brands"
        />

        <div className="brand-filter-items">
          {filteredBrands.map((brand) => {
            return (
              <label key={brand._id} className="filter-item">
                <input
                  type="checkbox"
                  checked={brandParams.includes(brand.slug)}
                  onChange={() => toggleBrandFilter(brand.slug)}
                />
                <span className="filter-item-text">{brand.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
