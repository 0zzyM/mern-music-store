import "./FeaturedProducts.css";
import { useState } from "react";
import { useEffect } from "react";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState(null);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const url = "http://localhost:5000/api/v1/products/featured";
        const res = await fetch(url);
        const data = await res.json();
        setFeaturedProducts(data);
        console.log(data);
      } catch (error) {
        const url = "http://localhost:5000/api/v1/products/featured";
        console.error(`Error fetching ${url} `, error);
      }
    };
    getFeaturedProducts();
  }, []);
  if (!featuredProducts) return <p>Loading...</p>;

  return (
    <>
      <>
        <div className="seperator"></div>

        <h2>Featured Products</h2>

        <div className="featured-wrapper">
          <div className="featured-product-container">
            {featuredProducts.map((product) => {
              return (
                <div className="featured-product">
                  <div className="featured-product-image-container">
                    <img
                      className="featured-product-image "
                      src={product.images[0]}
                      alt=""
                    />
                  </div>
                  <h3 className="featured-product-title">{product.name}</h3>
                  <p className="featured-product-price">€{product.price}</p>
                  <button className="add-to-cart-btn"> Add to Cart</button>
                </div>
              );
            })}
          </div>
        </div>
      </>
    </>
  );
}
