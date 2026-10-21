import { Link } from "react-router-dom";
import "./Cart.css";
import { FIXED_SHIPMENT_COST } from "../../config";
import { FaArrowRight } from "react-icons/fa6";
const CartCheckout = ({ subtotalPrice }) => {
  const total = (subtotalPrice + 5).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
  });

  return (
    <div className="cart-checkout">
      <div className="cart-order-summary">
        <h4 className="order-summary-title">Order Summary</h4>
        <div className="cart-subtotal">
          <p>Subtotal</p>
          <p>
            €
            {subtotalPrice.toLocaleString("de-DE", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="cart-discount">
          <p>Discount</p>
          <p>€0</p> {/*FIXME: Hardcoded!!! */}
        </div>
        <div className="cart-delivery">
          <p>Delivery Fee</p>
          <p>€{FIXED_SHIPMENT_COST}</p>{" "}
          {/*TECHNICALLY HARDCODED THIS NEEDS A SERVICE ON SERVER AND API TO CONSUME */}
        </div>
      </div>

      <div className="cart-total-section">
        <div className="cart-summary">
          <h3>Total</h3>
        </div>
        <h3>€{total}</h3>
      </div>

      {/*TODO: Add promo code section here! */}

      <button className="cart-checkout-btn">
        <span>Go to checkout</span>
        <span style={{ display: "flex" }}>
          <FaArrowRight />
        </span>
      </button>

      {/*TODO: Add list of methods here! */}
    </div>
  );
};

export default CartCheckout;
