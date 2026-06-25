import "./ProductGallery.css";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { resizeUrlForThumbnail } from "../../utils/imageUtils";

// TODO: Add Img Zoom

export default function ProductGallery({ product }) {
  const [imgIndex, setImgIndex] = useState(0);

  const totalImages = product.images.length;

  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    setImgIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className="left-product-page">
      <ul className="product-page-navigation">
        <li>
          <Link to={"/"} className="product-page-navigation-item">
            Home
          </Link>
        </li>
        <li>
          <Link to={`/categories`} className="product-page-navigation-item">
            All Categories
          </Link>
        </li>
        <li>
          <Link
            to={`../categories/${product.category.slug}`}
            className="product-page-navigation-item"
          >
            {product.category.name}
          </Link>
        </li>
        <li>
          <Link
            className="product-page-navigation-item"
            to={`../products/?subcategory=${product.subcategory.slug}`}
          >
            {product.subcategory.name}
          </Link>
        </li>
        <li className="product-page-navigation-result">{product.name}</li>
      </ul>
      <div className="product-gallery-container">
        <div className="product-page-image-thumbnails">
          {product.images.map((image, index) => (
            <button
              className="image-thumbnail-btn"
              aria-label={`View image ${index + 1}`}
              key={index}
              onClick={() => {
                setImgIndex(index);
              }}
            >
              {/* If the index equals to imgIndex Matches the border color to product.color or orange as a fall back*/}
              <img
                className="product-page-image-thumbnail"
                src={resizeUrlForThumbnail(image)}
                alt={`${product.name} thumbnail ${index + 1}`}
                style={
                  index === imgIndex
                    ? { border: `2px solid ${product.color || "orange"}` }
                    : null
                }
              />
            </button>
          ))}
        </div>
        <div className="main-image-container">
          <img
            className="product-page-main-image"
            src={product.images[imgIndex]}
            alt={product.name}
          />
          <button
            className="product-hero-image-prev-btn"
            aria-label="Previous image"
            onClick={handlePrev}
          >
            <FaChevronLeft className="product-hero-prev-icon" />
          </button>

          <button
            className="product-hero-image-next-btn"
            aria-label="Next image"
            onClick={handleNext}
          >
            <FaChevronRight className="product-hero-next-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
