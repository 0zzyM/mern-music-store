import ProductCard from "../ProductCard/ProductCard";
import "./ProductCarousel.css";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
const VISIBLE_CARDS = 5;
const SLIDE_AMOUNT = 250;

export default function ProductCarousel({ products, title, viewAllLink }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastSlide = currentIndex >= products.length - VISIBLE_CARDS;
  const isFirstSlide = currentIndex === 0;

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2>{title}</h2>
        <Link to={viewAllLink} className="carousel-header-action">
          <span>View all</span>
          <FaChevronRight className="carousel-view-all-icon" />
        </Link>
      </div>
      <div className="carousel-body">
        <button
          className="carousel-prev-btn"
          onClick={handlePrev}
          disabled={isFirstSlide}
          style={{ visibility: isFirstSlide ? "hidden" : "visible" }}
        >
          <FaChevronLeft className="carousel-prev-icon" />
        </button>
        <div
          className="product-container"
          style={{ transform: `translateX(-${currentIndex * SLIDE_AMOUNT}px)` }}
        >
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
        <button
          className="carousel-next-btn"
          onClick={handleNext}
          disabled={isLastSlide}
          style={{ visibility: isLastSlide ? "hidden" : "visible" }}
        >
          <FaChevronRight className="carousel-next-icon" />
        </button>
      </div>
    </div>
  );
}
