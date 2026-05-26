import BrandCard from "./BrandCard";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./BrandCarousel.css";
import { Link } from "react-router-dom";

export default function BrandsCarousel() {
  const [brands, setBrands] = useState(null);
  const [index, setIndex] = useState(0);

  const BRANDS_PER_PAGE = 12;

  useEffect(() => {
    const getBrands = async () => {
      const url = "http://localhost:5000/api/v1/brands";
      try {
        const res = await fetch(url);
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error(`Error fetching ${url} `, error);
      }
    };
    getBrands();
  }, []);

  if (!brands) return <p>Loading...</p>;

  const totalPages = Math.ceil(brands.length / BRANDS_PER_PAGE);

  const pages = [];
  for (let i = 0; i < brands.length; i += BRANDS_PER_PAGE) {
    pages.push(brands.slice(i, i + BRANDS_PER_PAGE));
  }

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="brands-carousel-container">
      <div className="carousel-header">
        <h2>Brands</h2>
        <Link to="/brands" className="carousel-header-action">
          <span>View all</span>
          <FaChevronRight className="carousel-view-all-icon" />
        </Link>
      </div>

      <div className="brands-carousel-wrapper">
        <div
          className="brands-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {pages.map((pageBrands, pageIndex) => (
            <div key={pageIndex} className="brands-carousel-page">
              <div className="brands-carousel-grid">
                {pageBrands.map((brand) => (
                  <BrandCard key={brand._id} brand={brand} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="brands-carousel-next-btn" onClick={handleNext}>
        <FaChevronRight className="brands-carousel-next-icon" />
      </button>

      <button className="brands-carousel-prev-btn" onClick={handlePrev}>
        <FaChevronLeft className="brands-carousel-prev-icon" />
      </button>
    </div>
  );
}
