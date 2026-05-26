import "./BrandCarousel.css";
import { Link } from "react-router-dom";

export default function BrandCard({ brand }) {
  return (
    <Link to={`/products/?brand=${brand.slug}`}>
      <div className="brand">
        <div className="brand-image-container">
          <img className="brand-image" src={brand.image} alt={brand.slug} />
        </div>
      </div>
    </Link>
  );
}
