import { useState } from "react";
import { useEffect } from "react";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

export default function ProductCollection({
  category,
  sortOption,
  isFeatured,
  title,
  subcategory,
}) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      let url = "http://localhost:5000/api/v1/products";

      let params = "";

      if (sortOption) {
        params += `&sort=${sortOption}`;
      }
      if (category) {
        params += `&category=${category}`;
      }
      if (isFeatured) {
        params += `&isFeatured=${isFeatured}`;
      }
      if (subcategory) {
        params += `&subcategory=${subcategory}`;
      }

      if (params) url += "?" + params.substring(1); // removes the 1st char of params not(0) it should be (1)

      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching ${url} `, error);
      }
    };
    getProducts();
  }, [category, sortOption, isFeatured]); // slug and title is excluded so the comp doesnt re-render

  if (!products) return <p>Loading...</p>;

  return (
    <ProductCarousel
      products={products}
      title={title}
      viewAllLink={`../products?subcategory=${subcategory}`}
    />
  );
}
