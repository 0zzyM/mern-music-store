import "./ProductCard.css";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { LuHeart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PiHeartFill } from "react-icons/pi";
import { BsCart2 } from "react-icons/bs";
import { MdStarRate } from "react-icons/md";
import { addItem, openCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product, qty) => {
    dispatch(addItem({ product, qty }));
    dispatch(openCart());
  };

  return (
    <div className="product">
      <Link to={`/products/${product._id}`}>
        <div className="product-image-container">
          <img
            className="product-image"
            src={product.images[0]}
            alt={product.name}
          />
          <button
            className="add-wishlist-btn"
            alt="Add to Wishlist"
            onClick={(e) => {
              e.preventDefault();
              {
                /*TODO: Add Wishlist Logic */
              }
            }}
          >
            <PiHeartFill className="add-wishlist-icon" />
          </button>

          <button
            className="product-card-compare-btn"
            onClick={(e) => {
              e.preventDefault();
              {
                /*TODO: Add Comparison Logic */
              }
            }}
          >
            <CgArrowsExchangeAlt className="product-card-compare-icon" />
          </button>
        </div>
      </Link>
      <div className="product-card-details">
        <p className="product-title">{product.name}</p>
        <p className="product-price">€{product.price}</p>
        <div className="product-card-rating-wrapper">
          <MdStarRate className="product-card-rating-icon" />
          <p className="product-card-rating">{product.rating}</p>
        </div>
      </div>

      <button
        className="product-card-add-to-cart-btn"
        onClick={() => handleAddToCart(product, 1)}
      >
        <BsCart2 className="add-to-cart-icon" />
        <p className="add-to-cart-text">Add to Cart</p>
      </button>
    </div>
  );
}
