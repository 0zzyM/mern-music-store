import guitarPromotionImage from "../../assets/guitar-promotion.jpg";
import ampPromotionImage from "../../assets/amp-promotion.jpg";
import pedalsPromotionImage from "../../assets/pedals-promotion.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PromotionBanner.css";
import { useState } from "react";

const images = [guitarPromotionImage, ampPromotionImage, pedalsPromotionImage]; //Sitting outside so it wouldn't get recreated on re-render

export default function PromotionBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="promotion-container">
      <div
        className="promotion-image-container"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((item, index) => (
          <img src={item} alt="" key={index} />
        ))}
      </div>

      <button className="promotion-banner-next-btn" onClick={handleNext}>
        <FaChevronRight className="promotion-banner-next-icon" />
      </button>
      <button className="promotion-banner-prev-btn" onClick={handlePrev}>
        <FaChevronLeft className="promotion-banner-prev-icon" />
      </button>
    </div>
  );
}
