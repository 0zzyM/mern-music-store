import { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList.jsx";
import ProductsHeader from "../components/ProductsHeader/ProductsHeader.jsx";
import SidebarFilter from "../components/SidebarFilter/SidebarFilter.jsx";
import { SERVER_URL } from "../config.js";
import { useFilters } from "../hooks/useFilters.js";

export default function ProductsPage() {
  const [title, setTitle] = useState("All Products");

  const { subcategory, category, filters } = useFilters();

  useEffect(() => {
    const getTitle = async () => {
      if (subcategory) {
        try {
          const res = await fetch(
            `${SERVER_URL}/api/v1/subcategories/${subcategory}`,
          );
          const data = await res.json();
          setTitle(data.name);
        } catch (error) {
          console.error(error);
        }
      } else if (category) {
        try {
          const res = await fetch(
            `${SERVER_URL}/api/v1/categories/${category}`,
          );
          const data = await res.json();
          setTitle(data.name);
        } catch (error) {
          console.error(error);
        }
      } else {
        setTitle("All Products");
      }
    };
    getTitle();
  }, [subcategory, category]);

  return (
    <div className="products-wrapper" style={{ width: "100%" }}>
      <ProductsHeader title={title.toUpperCase()} />
      <div
        className="products-page-body"
        style={{ width: "90%", display: "flex", justifyContent: "center" }}
      >
        <SidebarFilter />
        <ProductList filters={filters} subcategory={subcategory} />
      </div>
    </div>
  );
}
