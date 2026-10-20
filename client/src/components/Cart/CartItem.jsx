import { resizeUrlForThumbnail } from "../../utils/imageUtils";
import CartActions from "./CartActions";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  return (
    <div className="cart-item">
      <img
        src={resizeUrlForThumbnail(item.images[0])}
        alt={`${item.name}`}
        className="cart-thumbnail"
      />
      <div className="cart-item-details">
        <Link to={`../products/${item._id}`} className="cart-item-title">
          {item.name}
        </Link>
        <p className="cart-price">
          €
          {item.price.toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      <CartActions item={item} />
    </div>
  );
}
