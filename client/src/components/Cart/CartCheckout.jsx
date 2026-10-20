import { Link } from "react-router-dom";

const CartCheckout = ({ totalPrice }) => {
  return (
    <div className="cart-sidebar-checkout">
      <div className="cart-sidebar-total-section">
        <div className="cart-sidebar-summary">
          <h3>Total</h3>
          <p className="cart-sidebar-text-info">
            Taxes and <Link>shipping</Link> calculated at checkout
          </p>
        </div>
        <h3>€{totalPrice}</h3>
      </div>

      <button className="cart-sidebar-checkout-btn">Checkout</button>
    </div>
  );
};

export default CartCheckout;
