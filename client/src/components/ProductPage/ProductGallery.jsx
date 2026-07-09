import "./ProductGallery.css";
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { resizeUrlForThumbnail } from "../../utils/imageUtils";

const VISIBLE_IMG = 6;

// TODO: Add Img Zoom

export default function ProductGallery({ product }) {
  const [imgIndex, setImgIndex] = useState(0);

  // For thumbnail
  const totalImages = product.images.length;
  const maxOffset = Math.max(0, totalImages - VISIBLE_IMG);

  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    setImgIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className="left-product-page">
      <ul className="product-page-navigation" aria-label="Breadcrumb">
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
        <div className="product-page-thumbnail-wrapper">
          <button
            className="thumbnail-prev-btn"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <FaChevronUp />
          </button>
          <div className="product-image-thumbnail-viewport">
            <div
              className="product-page-image-thumbnails"
              style={{
                transform: `translateY(${
                  -66 *
                  Math.max(0, Math.min(imgIndex + 1 - VISIBLE_IMG, maxOffset))
                }px)`,
              }}
            >
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
          </div>
          <button
            className="thumbnail-next-btn"
            onClick={handleNext}
            aria-label="Next image"
          >
            <FaChevronDown />
          </button>
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
