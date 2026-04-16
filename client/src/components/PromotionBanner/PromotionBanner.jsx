import guitarPromotionImage from "../../assets/guitar-promotion.jpg";
import ampPromotionImage from "../../assets/amp-promotion.jpg";
import pedalsPromotionImage from "../../assets/pedals-promotion.jpg";

import nextImage from "../../assets/next.svg";
import prevImage from "../../assets/prev.svg";
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
    <>
      <div className="promotion-container">
        <div
          className="promotion-image-container"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((item, index) => (
            <img src={item} alt="" key={index} />
          ))}
        </div>

        <button className="promotion-banner-button-next" onClick={handleNext}>
          <img src={nextImage} alt="" />
        </button>
        <button className="promotion-banner-button-prev" onClick={handlePrev}>
          <img src={prevImage} alt="" />
        </button>
      </div>
    </>
  );
}
