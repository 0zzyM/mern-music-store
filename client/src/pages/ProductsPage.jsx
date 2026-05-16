import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList.jsx";
import ProductsHeader from "../components/ProductsHeader/ProductsHeader.jsx";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("All Products");

  const subcategory = searchParams.get("subcategory");
  const category = searchParams.get("category");
  const filters = searchParams.toString() ? `?${searchParams.toString()}` : "";

  useEffect(() => {
    const getTitle = async () => {
      if (subcategory) {
        try {
          const res = await fetch(
            `http://localhost:5000/api/v1/subcategories/${subcategory}`,
          );
          const data = await res.json();
          setTitle(data.name);
        } catch (error) {
          console.error(error);
        }
      } else if (category) {
        try {
          const res = await fetch(
            `http://localhost:5000/api/v1/categories/${category}`,
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
    <div className="products-wrapper">
      <ProductsHeader title={title} />
      <ProductList filters={filters} />
    </div>
  );
}
