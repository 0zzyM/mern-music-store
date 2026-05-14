import { Link } from "react-router-dom";
import "./ProductList.css";
import { FaStar } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { PiScales } from "react-icons/pi";
import { GoDot, GoDotFill } from "react-icons/go";

export default function ProductListCard({ product }) {
  return (
    <div className="product-listing">
      <Link to={`/products/${product._id}`}>
        <div className="listing-image-container">
          <img
            className="listing-image"
            src={product.images[0]}
            alt={product.name}
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
          <div className="listing-extra-details">
            <p>
              <GoDot />
              Body: American alder (Hardcoded placeholder)
            </p>
            <p>
              <GoDot />
              Neck: Roasted flamed Canadian maple (Hardcoded placeholder)
            </p>
            <p>
              <GoDot />
              Fingerboard: Canadian roasted maple(Hardcoded placeholder)
            </p>
            <p>
              <GoDot />
              Pickups: EMG 81-85 Set (Hardcoded placeholder)
            </p>
          </div>
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
            <button className="listing-action-button">
              <PiScales className="compare-listings-icon" />
            </button>
            <button className="listing-action-button">
              <CiHeart className="hearth-wish-icon" />
            </button>
            <button className="listing-action-button">
              <CiShoppingCart className="shopping-cart-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
