import "./FeaturedProducts.css";
import { useState } from "react";
import { useEffect } from "react";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState(null);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      const url = "http://localhost:5000/api/v1/products/featured";
      try {
        const res = await fetch(url);
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error(`Error fetching ${url} `, error);
      }
    };
    getFeaturedProducts();
  }, []);

  if (!featuredProducts) return <p>Loading...</p>;

  return (
    <>
      <div className="featured-wrapper">
        <h2>Featured Products</h2>
        <div className="featured-product-container">
          <ProductCarousel products={featuredProducts} />
        </div>
      </div>
    </>
  );
}
