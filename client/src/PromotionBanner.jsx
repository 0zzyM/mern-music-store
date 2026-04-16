import guitarPromotionImage from "./assets/guitar-promotion.jpg";
import ampPromotionImage from "./assets/amp-promotion.jpg";
import pedalsPromotionImage from "./assets/pedals-promotion.jpg";
import nextImage from "./assets/next.svg";
import prevImage from "./assets/prev.svg";
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
      {/*Promotion Container */}
      <div className="flex w-full relative min-h-[480px] overflow-hidden">
        <div
          className="flex flex-row  transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((item, index) => (
            <img
              className="w-full h-full object-cover flex-shrink-0 hover:cursor-pointer"
              src={item}
              alt=""
              key={index}
            />
          ))}
        </div>

        {/*Promotion Banner Next Button */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 bg-orange-500 rounded-full p-1 cursor-pointer"
          onClick={handleNext}
        >
          <img src={nextImage} alt="" />
        </button>

        {/*Promotion Banner Prev Button */}

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 bg-orange-500 rounded-full p-1 cursor-pointer"
          onClick={handlePrev}
        >
          <img src={prevImage} alt="" />
        </button>
      </div>
    </>
  );
}
