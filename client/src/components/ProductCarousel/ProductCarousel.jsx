import ProductCard from "../ProductCard/ProductCard";
import "./ProductCarousel.css";
import prevImage from "../../assets/prev.svg";
import nextImage from "../../assets/next.svg";
import { useState } from "react";
const VISIBLE_CARDS = 5;
const SLIDE_AMOUNT = 250;

export default function ProductCarousel({ products }) {
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
      <button
        className="carousel-prev-btn"
        onClick={handlePrev}
        disabled={isFirstSlide}
        style={{ visibility: `${isFirstSlide ? "hidden" : "visible"}` }}
      >
        <img src={prevImage} alt="prevItem" />
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
        style={{ visibility: `${isLastSlide ? "hidden" : "visible"}` }}
      >
        <img src={nextImage} alt="nextItem" />
      </button>
    </div>
  );
}
