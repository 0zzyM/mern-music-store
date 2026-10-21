import CartHeader from "./CartHeader";
import "./EmptyCart.css";
import { Link } from "react-router-dom";
export default function EmptyCart() {
  return (
    <div className="empty-cart-wrapper">
      <CartHeader />
      <h4>You haven't added any items to your cart yet.</h4>
      <p>
        Unleash your tone! Explore top brands, discover new and trending tools
        and instruments, and find the perfect picks for your style and budget.
      </p>
      <div className="empty-cart-actions">
        <Link to={`../products`} className="empty-cart-browse-items-btn">
          BROWSE ITEMS
        </Link>
        <Link to={`../categories`} className="empty-cart-browse-categories-btn">
          BROWSE CATEGORIES
        </Link>
      </div>
    </div>
  );
}
