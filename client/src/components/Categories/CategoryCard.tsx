import "./Categories.css";
import { Link } from "react-router-dom";
import type { Category } from "../../types/CategoryType";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/categories/${category.slug}`}>
      <div className="category">
        <div className="category-image-container">
          <img
            className="category-image"
            src={category.image}
            alt={category.name}
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
