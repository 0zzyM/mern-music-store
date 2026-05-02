import "./Categories.css";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category.slug}`} className="category">
      <div className="category">
        <div className="category-image-container">
          <img
            className="category-image"
            src={category.image}
            alt={category.slug}
          />
        </div>
        <div className="category-actions">
          <p className="category-title">{category.name}</p>
          <button className="explore-category-btn">Explore</button>
        </div>
      </div>
    </Link>
  );
}
