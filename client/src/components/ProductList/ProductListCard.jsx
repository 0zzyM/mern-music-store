import { Link } from "react-router-dom";
import "./ProductList.css";
import { FaStar } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { PiScales } from "react-icons/pi";
import { GoDot, GoDotFill } from "react-icons/go";
import { addItem, openCart } from "../../features/cartSlice.js";
import { useDispatch } from "react-redux";
import { resizeUrlForCard } from "../../utils/imageUtils.js";

export default function ProductListCard({ product }) {
  const dispatch = useDispatch();

  function handleAddToCart(product, qty) {
    dispatch(addItem({ product, qty }));
    dispatch(openCart());
  }

  return (
    <div className="product-listing">
      <Link to={`/products/${product._id}`}>
        <div className="listing-image-container">
          <img
            className="listing-image"
            src={resizeUrlForCard(product.images[0])}
            alt={product.name}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="listing-content-container">
        <div className="listing-details">
          <Link to={`/products/${product._id}`}>
            <div className="listing-title">
              <p className="listing-brand">{product.brand.name}</p>
              <p className="listing-name">{product.name}</p>
            </div>

            <div className="listing-rating">
              {[...Array(5)].map((_, index) => {
                return <FaStar key={index} />;
              })}
            </div>
          </Link>
          {product.details &&
            product.subcategory.slug === "electric-guitars" && (
              <div className="listing-extra-details">
                <p className="listing-detail">
                  <b>Body Material:</b> {product.details.bodyMaterial}
                </p>

                <p className="listing-detail">
                  <b>Fingerboard Material:</b> {product.details.bodyMaterial}
                </p>
                <p className="listing-detail">
                  <b>Frets:</b> {product.details.frets}
                </p>
              </div>
            )}
          <p className="listing-stock">
            <GoDotFill
              style={product.stock ? { color: "green" } : { color: "red" }}
            />
            {product.stock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <div className="listing-details-secondary">
          <div className="listing-price-details">
            <p className="listing-price">€{product.price}</p>
          </div>

          <div className="listing-actions">
            <button
              className="listing-action-button"
              aria-label="Compare product"
            >
              <PiScales className="compare-listings-icon" />
            </button>
            <button className="listing-action-button">
              <CiHeart
                className="hearth-wish-icon"
                aria-label="Add to wishlist"
              />
            </button>
            <button
              className="listing-action-button"
              onClick={() => {
                handleAddToCart(product, 1);
              }}
              aria-label="Add to cart"
            >
              <CiShoppingCart className="shopping-cart-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
