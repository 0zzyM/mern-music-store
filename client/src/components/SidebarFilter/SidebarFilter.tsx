import "./SidebarFilter.css";

import PriceFilter from "./PriceFilter";
import StockFilter from "./StockFilter";
import RatingFilter from "./RatingFilter";
import BrandFilter from "./BrandFilter";

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
