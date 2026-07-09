import "./Subcategories.css";
import { Link } from "react-router-dom";

export default function SubcategoryCard({ subcategory }) {
  return (
    <Link to={`/products?subcategory=${subcategory.slug}`} className="category">
      <div className="subcategory">
        <div className="subcategory-image-container">
          <img
            className="subcategory-image"
            src={subcategory.image}
            alt={subcategory.name}
          />
        </div>
        <div className="subcategory-actions">
          <p className="subcategory-title">{subcategory.name}</p>
          <button className="explore-subcategory-btn">Explore</button>
        </div>
      </div>
    </Link>
  );
}
