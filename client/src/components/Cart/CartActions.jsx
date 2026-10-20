import { useDispatch } from "react-redux";
import { removeItem, updateQty } from "../../features/cartSlice";
import { LuTrash, LuPlus, LuMinus } from "react-icons/lu";

export default function CartActions({ item }) {
  const dispatch = useDispatch();

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

  return (
    <div className="cart-actions-wrapper">
      <div className="cart-actions">
        <button
          className="cart-sidebar-minus-btn"
          onClick={() => decItemQty(item._id, item.quantity)}
          aria-label="Decrease quantity"
        >
          <LuMinus />
        </button>
        <input
          type="number"
          value={item.quantity}
          className="cart-sidebar-qty"
          aria-label="Quantity"
          readOnly
        />
        <button
          className="cart-sidebar-plus-btn"
          onClick={() => incItemQty(item)}
          aria-label="Increase quantity"
        >
          <LuPlus />
        </button>
      </div>

      <button
        className="cart-delete-btn"
        onClick={() => {
          handleRemoveItem(item._id);
        }}
      >
        Remove
      </button>
    </div>
  );
}
