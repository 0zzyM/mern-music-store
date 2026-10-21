import "./Cart.css";
import { useSelector } from "react-redux";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem.jsx";
import CartCheckout from "./CartCheckout";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);

  const subtotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className={`cart-wrapper ${cartItems.length <= 0 ? "empty" : ""}`}>
      {cartItems.length > 0 ? (
        <>
          <div className="cart-products">
            <CartHeader />

            {cartItems.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <CartCheckout subtotalPrice={subtotalPrice} /> )
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
