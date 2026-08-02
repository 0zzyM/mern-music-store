import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PromotionBanner.css";
import { useState, useEffect } from "react";
import PromotionBannerItem from "./PromotionBannerItem";
import { usePromotions } from "../../hooks/usePromotions";
import type { Promotion } from "../../types/PromotionType";

export default function PromotionBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: promotions, isPending, isError } = usePromotions();

  useEffect(() => {
    // initial load will return null
    // promotions?.length === 0 did not work here
    if (!promotions?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promotions, currentImageIndex]); // only handles auto-swipe

  //TODO: these all will change with skeletton loading
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching promotions...</p>;

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % promotions.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + promotions.length) % promotions.length,
    );
  };

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
