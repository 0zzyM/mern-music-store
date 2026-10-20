import { IoClose } from "react-icons/io5";

export default function CartHeader(cartItems) {
  <header className="cart-header">
    <div className="cart-title">
      <h3>Cart</h3>
      <p className="cart-items-total">{cartItems.length}</p>
    </div>
  </header>;
}
