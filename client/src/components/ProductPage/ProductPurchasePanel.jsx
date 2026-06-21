import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductPurchasePanel.css";
import "../ProductList/ProductList.css";
import { CiHeart, CiShare2, CiDeliveryTruck } from "react-icons/ci";
import { PiScales } from "react-icons/pi";
import { addItem, openCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ProductPurchasePanel({ product }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  function handleAddToCart(product, qty) {
    dispatch(addItem({ product, qty }));
    dispatch(openCart());
  }

  return (
    <div className="product-purchase-panel">
      <h1 className="product-page-title">{product.name}</h1>

      <div className="listing-rating-details">
        <div className="listing-rating">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            if (product.rating >= starValue) {
              return <FaStar key={index} style={{ color: "gold" }} />;
            } else if (product.rating >= starValue - 0.5) {
              return <FaStarHalfAlt key={index} style={{ color: "gold" }} />;
            } else {
              return <FaStar key={index} style={{ color: "grey" }} />;
            }
          })}
        </div>

        {/*TODO: Change rating down here so it would let the bottom of the page to the reviews when it is ready!!! */}
        <p>({product.reviewCount})</p>
      </div>

      <div className="product-page-price-section">
        <h3 className="product-page-price">
          €{product.price.toLocaleString()}
        </h3>
        <p
          className={
            product.stock > 0 ? "product-page-stock" : "product-page-no-stock"
          }
        >
          {product.stock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      <div className="product-page-cart-section">
        <input
          className="product-page-order-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button
          className="product-page-add-to-cart-btn"
          onClick={() => {
            handleAddToCart(product, quantity);
          }}
        >
          Add to Cart
        </button>
      </div>

      <div className="product-page-listing-actions">
        <button className="product-page-listing-action-button">
          <CiHeart className="product-page-hearth-wish-icon" />
          <p>Wishlist</p>
        </button>
        <button className="product-page-listing-action-button">
          <PiScales className="product-page-compare-listings-icon" />
          <p>Compare</p>
        </button>
        <button className="product-page-listing-action-button">
          <CiShare2 className="product-page-shopping-cart-icon" />
          <p>Share</p>
        </button>
      </div>

      {/*FIXME: These values are hardcoded, later needs to be corrected when backend is ready*/}

      <div className="delivery-wrapper">
        <div className="main-delivery-details">
          <CiDeliveryTruck className="delivery-icon" />
          <h4 className="delivery-title">Standard Delivery</h4>
          <p className="delivery-price">€5</p>
        </div>

        <p className="delivery-info-text">
          Delivery in approx. 5-10 business days
        </p>

        <Link className="shipping-info-link">Shipping Information</Link>
      </div>
    </div>
  );
}
