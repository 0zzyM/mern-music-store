import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../config.js";
import { FaUser } from "react-icons/fa";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";

import "./MobileDrawer.css";

export default function MobileDrawer({ isMenuOpen, onClose }) {
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  return (
    <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
      <div className="mobile-drawer-header">
        <Link className="mobile-hamburger-logo" to="/" onClick={onClose}>
          ozzyMusic
        </Link>
        <button
          className="mobile-drawer-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <IoClose />
        </button>
      </div>

      <ul className="mobile-nav-list">
        <li className="mobile-nav-item">
          <Link
            onClick={onClose}
            className="mobile-nav-category user-action"
            to="/login"
          >
            <span>
              <FaUser />
              Login or Register
            </span>

            <HiArrowLongRight />
          </Link>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.slug} className="mobile-nav-item">
            <button
              className="mobile-nav-category"
              onClick={() =>
                setOpenCategory(
                  openCategory === category.slug ? null : category.slug,
                )
              }
            >
              <span>{category.name}</span>
              <IoChevronDown
                className={`mobile-nav-chevron ${openCategory === category.slug ? "rotated" : ""}`}
              />
            </button>
            {openCategory === category.slug && (
              <ul className="mobile-subcategory-list">
                {category.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      to={`/products?subcategory=${sub.slug}`}
                      className="mobile-subcategory-item"
                      onClick={onClose}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
