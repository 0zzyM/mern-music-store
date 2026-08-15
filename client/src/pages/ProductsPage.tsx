import ProductList from "../components/ProductList/ProductList";
import ProductsHeader from "../components/ProductsHeader/ProductsHeader";
import SidebarFilter from "../components/SidebarFilter/SidebarFilter";
import { useFilters } from "../hooks/useFilters.js";

export default function ProductsPage() {
  const { subcategory, category, brandParams, filters } = useFilters();
  let title = "";

  if (subcategory) {
    title = subcategory;
  } else if (category) {
    title = category;
  } else if (brandParams.length === 1) {
    title = brandParams[0];
  } else {
    title = "All Products";
  }

  return (
    <div className="products-wrapper" style={{ width: "100%" }}>
      <ProductsHeader title={title.toUpperCase()} />
      <div
        className="products-page-body"
        style={{ width: "90%", display: "flex", justifyContent: "center" }}
      >
        <SidebarFilter />
        <ProductList filters={filters} />
      </div>
    </div>
  );
}
