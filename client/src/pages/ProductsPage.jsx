import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductListing/ProductList.jsx";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();

  // Build filter string from URL params

  console.log(searchParams);
  console.log(searchParams.toString());

  const filters = searchParams.toString() ? `?${searchParams.toString()}` : "";

  console.log(filters);
  return (
    <div>
      <h1>Products</h1>
      <ProductList filters={filters} />
    </div>
  );
}
