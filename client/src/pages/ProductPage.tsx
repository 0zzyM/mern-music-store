import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductPage/ProductGallery";
import ProductPurchasePanel from "../components/ProductPage/ProductPurchasePanel";
import ProductInfo from "../components/ProductPage/ProductInfo";
import "../components/ProductPage/ProductPage.css";
import { useProduct } from "../hooks/useProducts";

export default function ProductPage() {
  const { id } = useParams();

  //TODO: All these should be validated later on an return a Not found or smt went wrong page
  const { data: product, isPending, isError } = useProduct(id!);

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching product</p>;

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
