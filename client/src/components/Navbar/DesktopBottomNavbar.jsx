import "./Navbar.css";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../config.js";

export default function DesktopBottomNavbar({ isSearching }) {
  return (
    <nav
      className="page-header-bottom"
      style={isSearching ? { visibility: "hidden" } : { opacity: "1" }}
    >
      {/*TODO: Consider re-styling Navbar dropdown */}
      <ul className="categories-nav">
        {CATEGORIES.map((category) => {
          return (
            <li key={category.slug} className="nav-item">
              <Link to={`/categories/${category.slug}`}>{category.name}</Link>
              <div className="header-dropdown">
                {category.subcategories.map((subcategory) => {
                  return (
                    <Link
                      key={subcategory.slug}
                      to={`/products?subcategory=${subcategory.slug}`}
                      className="header-dropdown-item"
                    >
                      {subcategory.name}
                    </Link>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
