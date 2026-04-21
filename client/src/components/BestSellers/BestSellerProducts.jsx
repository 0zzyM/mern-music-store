import "./BestSellers.css";
import { useState } from "react";
import { useEffect } from "react";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

export default function BestSellerProducts() {
  const [bestSellers, setBestSellers] = useState(null);

  useEffect(() => {
    const getBestSellers = async () => {
      const url = "http://localhost:5000/api/v1/products?sort=mostSold";
      try {
        const res = await fetch(url);
        const data = await res.json();
        setBestSellers(data);
      } catch (error) {
        console.error(`Error fetching ${url} `, error);
      }
    };
    getBestSellers();
  }, []);

  if (!bestSellers) return <p>Loading...</p>;

  return (
    <div className="best-seller-wrapper">
      <h2>Best Sellers</h2>
      <div className="best-seller-product-container">
        <ProductCarousel products={bestSellers} />
      </div>
    </div>
  );
}
