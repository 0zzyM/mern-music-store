import "./CartSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { closeCart, removeItem, updateQty } from "../../features/cartSlice";
import { LuTrash, LuPlus, LuMinus } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function CartSidebar() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const isCartView = useSelector((state) => state.cart.isCartOpen);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const incItemQty = (item) => {
    if (item.quantity < item.stock) {
      dispatch(updateQty({ id: item._id, qty: item.quantity + 1 }));
    }
  };

  const decItemQty = (id, qty) => {
    if (qty <= 1) {
      dispatch(removeItem(id));
      return;
    }
    dispatch(updateQty({ id, qty: qty - 1 }));
  };

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toLocaleString("de-DE", {
      minimumFractionDigits: 2,
    });

  return (
    <div
      className={
        isCartView ? "cart-sidebar-wrapper open" : "cart-sidebar-wrapper"
      }
    >
      <div className="cart-sidebar-products">
        <header className="cart-sidebar-header">
          <div className="cart-sidebar-title">
            <h3>Cart</h3>
            <p className="cart-sidebar-items-total">{cartItems.length}</p>
          </div>
          <button
            className="cart-sidebar-close-btn"
            onClick={() => {
              dispatch(closeCart());
            }}
          >
            <IoClose />
          </button>
        </header>

        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <div className="cart-sidebar-item" key={item._id}>
                <img
                  src={item.images[0]}
                  alt={`${item.name}`}
                  className="cart-sidebar-thumbnail"
                />
                <div className="cart-sidebar-item-details">
                  <Link
                    to={`../products/${item._id}`}
                    className="cart-sidebar-item-title"
                  >
                    {item.name}
                  </Link>
                  <p className="cart-sidebar-price">
                    €
                    {item.price.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="cart-sidebar-actions-wrapper">
                  <div className="cart-sidebar-actions">
                    <button
                      className="cart-sidebar-minus-btn"
                      onClick={() => decItemQty(item._id, item.quantity)}
                    >
                      <LuMinus />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      className="cart-sidebar-qty"
                    />
                    <button
                      className="cart-sidebar-plus-btn"
                      onClick={() => incItemQty(item)}
                    >
                      <LuPlus />
                    </button>
                  </div>

                  <button
                    className="cart-sidebar-delete-btn"
                    onClick={() => {
                      handleRemoveItem(item._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
      </div>

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

        <div className="cart-sidebar-checkout-actions">
          <button className="cart-sidebar-view-cart-btn">View Cart</button>
          <button className="cart-sidebar-checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}
