import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <p className="product-brand">{product.brand.name}</p>
      <p className="product-title">{product.name}</p>
      <p className="product-price">€{product.price}</p>
      <button className="add-to-cart-btn"> Add to Cart</button>
    </div>
  );
}
