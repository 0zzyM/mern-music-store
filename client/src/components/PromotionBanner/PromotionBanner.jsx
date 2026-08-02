import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PromotionBanner.css";
import { useState, useEffect } from "react";
import PromotionBannerItem from "./PromotionBannerItem";
import { SERVER_URL } from "../../config.js";

export default function PromotionBanner() {
  const [promotions, setPromotions] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % promotions.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + promotions.length) % promotions.length,
    );
  };

  useEffect(() => {
    const getPromotions = async () => {
      try {
        const url = `${SERVER_URL}/api/v1/promotions`;
        const res = await fetch(url);
        const data = await res.json();
        setPromotions(data);
      } catch (error) {
        console.error(error);
      }
    };

    getPromotions();
  }, []);

  useEffect(() => {
    // initial load will return null
    if (!promotions) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promotions, currentImageIndex]); // only handles auto-swipe

  if (!promotions) return <p>Loading...</p>;

  return (
    <div className="promotion-container">
      <div
        className="promotion-item"
        style={{
          transform: `translateX(calc(${currentImageIndex} * (-100% - var(--slide-gap))))`,
        }}
      >
        {promotions.map((promotion) => {
          return (
            <PromotionBannerItem promotion={promotion} key={promotion._id} />
          );
        })}
      </div>

      <button
        className="promotion-banner-next-btn"
        onClick={handleNext}
        aria-label="Next promotion"
      >
        <FaChevronRight className="promotion-banner-next-icon" />
      </button>
      <button
        className="promotion-banner-prev-btn"
        onClick={handlePrev}
        aria-label="Previous promotion"
      >
        <FaChevronLeft className="promotion-banner-prev-icon" />
      </button>
    </div>
  );
}
