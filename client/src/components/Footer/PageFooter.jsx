import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PageFooter.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SERVER_URL } from "../../config.js";

export default function PageFooter() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const url = `${SERVER_URL}/api/v1/categories`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(`Error fetching ${url} `, error);
      }
    };

    getCategories();
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-socials">
        <a
          href="https://github.com/0zzyM"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="footer-socials-icon" />
        </a>
        <a
          href="https://mt.linkedin.com/in/ozzyacar"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="footer-socials-icon" />
        </a>
      </div>

      <div className="footer-main">
        {categories && (
          <div className="footer-categories-container">
            {categories.map((category) => {
              return (
                <div key={category._id} className="footer-category">
                  <Link
                    to={`/categories/${category.slug}`}
                    className="footer-category-item"
                  >
                    {category.name}
                  </Link>

                  {category.subcategories.map((subcat) => {
                    return (
                      <Link
                        key={subcat._id}
                        to={`/products?subcategory=${subcat.slug}`}
                        className="footer-subcategory-item"
                      >
                        {subcat.name}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
        <div className="footer-info">
          <div className="footer-info-column">
            <h4>Help</h4>
            <a href="#">Customer Service</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQ</a>
            <a href="#">Terms & Conditions</a>
          </div>

          <div className="footer-info-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ozzyMusic. All rights reserved.</p>
      </div>
    </footer>
  );
}
