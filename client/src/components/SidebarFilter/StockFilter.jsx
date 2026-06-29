import { useFilters } from "../../hooks/useFilters";
import "./SidebarFilter.css";

export default function StockFilter() {
  const { inStock, toggleStock } = useFilters();

  return (
    <div className="product-filter">
      <h3>Availability</h3>
      <label className="filter-item">
        <input type="checkbox" checked={inStock} onChange={toggleStock} />
        <p>In Stock</p>
      </label>
    </div>
  );
}
