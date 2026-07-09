import { FiSearch } from "react-icons/fi";
import { SERVER_URL } from "../../config.js";
import { useFilters } from "../../hooks/useFilters.js";
import { useEffect, useState } from "react";

export default function BrandFilter() {
  const [brands, setBrands] = useState(null);
  const { brandParams, toggleBrandFilter } = useFilters();
  const [query, setQuery] = useState("");

  const changeQuery = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/v1/brands`);
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBrands();
  }, []);

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
