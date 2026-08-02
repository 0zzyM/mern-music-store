import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductPage/ProductGallery.jsx";
import ProductPurchasePanel from "../components/ProductPage/ProductPurchasePanel.jsx";
import ProductInfo from "../components/ProductPage/ProductInfo.jsx";
import "../components/ProductPage/ProductPage.css";
import { SERVER_URL } from "../config.js";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const url = `${SERVER_URL}/api/v1/products/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div className="product-page-wrapper">
        <div className="product-page-main">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <ProductPurchasePanel product={product} />
      </div>
    </>
  );
}
