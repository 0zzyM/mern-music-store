import { resizeUrlForThumbnail } from "../../utils/imageUtils";
import CartActions from "./CartActions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem } from "../../features/cartSlice";
import { IoClose } from "react-icons/io5";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <div className="cart-item">
      <img
        src={resizeUrlForThumbnail(item.images[0])}
        alt={`${item.name}`}
        className="cart-thumbnail"
      />
      <Link to={`../products/${item._id}`} className="cart-item-title">
        {item.name}
      </Link>

      <CartActions item={item} />

      <p className="cart-price">
        €
        {item.price.toLocaleString("de-DE", {
          minimumFractionDigits: 2,
        })}
      </p>
      <button
        className="cart-delete-btn"
        onClick={() => {
          handleRemoveItem(item._id);
        }}
      >
        <IoClose className="cart-delete-icon" />
      </button>
    </div>
  );
}
