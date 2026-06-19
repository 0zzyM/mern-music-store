import { useEffect } from "react";
import { useState } from "react";
import ProductListCard from "./ProductListCard";
import "./ProductList.css";
import { SERVER_URL } from "../../config.js";

export default function ProductList({ filters }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      let url = `${SERVER_URL}/api/v1/products`;
      if (filters) url += filters;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching ${url}`, error);
      }
    };
    getProducts();
  }, [filters]);

  if (!products) return <p>Loading...</p>;

  return (
    <div className="product-list">
      {products.map((product) => {
        return <ProductListCard key={product._id} product={product} />;
      })}
    </div>
  );
}
