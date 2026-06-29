import { useFilters } from "../../hooks/useFilters";
import { FaStar } from "react-icons/fa";
import "./SidebarFilter.css";

export default function RatingFilter() {
  const { highRated, toggleRating } = useFilters();
  return (
    <div className="product-filter">
      <h3>Rating</h3>
      <label className="filter-item">
        <input type="checkbox" checked={highRated} onChange={toggleRating} />
        <span className="filter-item-content">
          {[1, 2, 3, 4].map((i) => (
            <FaStar key={i} className="filter-star" />
          ))}
          <FaStar className="filter-star inactive" />
          <span>& Up</span>
        </span>
      </label>
    </div>
  );
}
