import "./SidebarFilter.css";

import PriceFilter from "./PriceFilter.jsx";
import StockFilter from "./StockFilter.jsx";
import RatingFilter from "./RatingFilter.jsx";
import BrandFilter from "./BrandFilter.jsx";

export default function SidebarFilter() {
  return (
    <div className="sidebar-filter-wrapper">
      <BrandFilter />
      <PriceFilter />
      <StockFilter />
      <RatingFilter />
    </div>
  );
}
