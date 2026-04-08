import soloistImg from "./assets/jackson-soloist-sl1.png";
import stratImg from "./assets/fender-usa-stratocaster.png";
import marshallImg from "./assets/marshall-jvm-410.png";

import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  return (
    <>
      <div className="seperator"></div>

      <h2>Featured Products</h2>

      <div className="featured-wrapper">
        <div className="featured-product-container">
          <div className="featured-product">
            <div className="featured-product-image-container">
              <img
                className="featured-product-image "
                src={soloistImg}
                alt=""
              />
            </div>
            <h3 className="featured-product-title">Jackson USA Soloist SL1</h3>
            <p className="featured-product-price">€3,599.00</p>
            <button className="add-to-cart-btn"> Add to Cart</button>
          </div>
          <div className="featured-product">
            <div className="featured-product-image-container">
              <img className="featured-product-image " src={stratImg} alt="" />
            </div>
            <h3 className="featured-product-title">Jackson USA Soloist SL1</h3>
            <p className="featured-product-price">€3,599.00</p>
            <button className="add-to-cart-btn"> Add to Cart</button>
          </div>
          <div className="featured-product">
            <div className="featured-product-image-container">
              <img
                className="featured-product-image "
                src={marshallImg}
                alt=""
              />
            </div>
            <h3 className="featured-product-title">Marshall JVM410H</h3>
            <p className="featured-product-price">€1,299.00</p>
            <button className="add-to-cart-btn"> Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
