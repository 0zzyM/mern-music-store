import "./SidebarFilter.css";
import { useFilters } from "../../hooks/useFilters";
import { useState } from "react";

export default function PriceFilter() {
  const { minPrice, maxPrice, handleMinPrice, handleMaxPrice } = useFilters();
  const [err, setErr] = useState("");
  const [localMin, setLocalMin] = useState(minPrice ?? "");
  const [localMax, setLocalMax] = useState(maxPrice ?? "");

  return (
    <div className="price-filter">
      <h3>Price</h3>

      <div className="price-input-filter">
        <input
          type="number"
          className="filter-search"
          placeholder="Min Price"
          value={localMin}
          onChange={(e) => {
            setLocalMin(e.target.value);
            setErr("");
            handleMinPrice(e.target.value, () => {
              setLocalMin(minPrice ?? "");
              setErr("Minimum price can't be higher than maximum price");
            });
          }}
          onKeyDown={(e) =>
            ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
          }
        />

        <input
          type="number"
          className="filter-search"
          placeholder="Max price"
          value={localMax}
          onChange={(e) => {
            setLocalMax(e.target.value);
            setErr("");
            handleMaxPrice(e.target.value, () => {
              setLocalMax(maxPrice ?? "");
              setErr("Maximum price can't be lower than minimum price");
            });
          }}
          onKeyDown={(e) =>
            ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
          }
        />

        {err && <p className="price-error">{err}</p>}
      </div>
      {/*TODO: Add Price filtering slider bar later */}
    </div>
  );
}
