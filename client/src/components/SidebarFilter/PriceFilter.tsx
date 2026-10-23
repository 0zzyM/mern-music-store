import "./SidebarFilter.css";
import { useFilters } from "../../hooks/useFilters";
import { useState } from "react";
import { MAX_ITEM_PRICE } from "../../config";

export default function PriceFilter() {
  const { minPrice, maxPrice, handleMinPrice, handleMaxPrice } = useFilters();
  const [err, setErr] = useState("");
  const [localMin, setLocalMin] = useState(minPrice ?? String(0));
  const [localMax, setLocalMax] = useState(maxPrice ?? String(MAX_ITEM_PRICE));

  return (
    <div className="price-filter">
      <h3>Price</h3>

      <div className="price-input-wrapper">
        <input
          type="number"
          className="price-filter-search"
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
          aria-label="Minimum price"
        />

        <input
          type="number"
          className="price-filter-search"
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
          aria-label="Maximum price"
        />

        {err && <p className="price-error">{err}</p>}
      </div>

      <div className="price-range-wrapper">
        <input
          type="range"
          value={Number(localMin) / 100}
          onChange={(e) => {
            setLocalMin(
              String((Number(e.target.value) * MAX_ITEM_PRICE) / 100),
            );
            setErr("");
            handleMinPrice(
              String((Number(e.target.value) * MAX_ITEM_PRICE) / 100),
              () => {
                setLocalMin(minPrice ?? "");
                setErr("Minimum price can't be higher than maximum price");
              },
            );
          }}
          className="price-range-slider-min"
        />
        <input
          type="range"
          value={
            Number(localMax) >= 0 ? Number(localMax) / 100 : MAX_ITEM_PRICE
          }
          className="price-range-slider-max"
          onChange={(e) => {
            setLocalMax(
              String((Number(e.target.value) * MAX_ITEM_PRICE) / 100),
            );
            setErr("");
            handleMaxPrice(
              String((Number(e.target.value) * MAX_ITEM_PRICE) / 100),
              () => {
                setLocalMin(minPrice ?? "");
                setErr("Minimum price can't be higher than maximum price");
              },
            );
          }}
        />
      </div>
    </div>
  );
}
