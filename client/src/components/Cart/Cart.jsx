import "./Cart.css";
import { useSelector } from "react-redux";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem.jsx";
import CartCheckout from "./CartCheckout";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);

  const subtotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-wrapper">
      <div className="cart-products">
        <CartHeader />

        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
      </div>

      <CartCheckout subtotalPrice={subtotalPrice} />
    </div>
  );
}
