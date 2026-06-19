import { useParams } from "react-router-dom";
import SubcategoriesGrid from "../components/Subcategories/SubcategoriesGrid.jsx";
import ProductCollection from "../components/ProductCollection/ProductCollection.jsx";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config.js";

export default function CategoryPage() {
  const { category } = useParams();

  const [subcategories, setSubcategories] = useState(null);

  useEffect(() => {
    const getSubcategories = async () => {
      const res = await fetch(
        `${SERVER_URL}/api/v1/categories/${category}/subcategories`,
      );
      const data = await res.json();
      setSubcategories(data);
    };
    getSubcategories();
  }, [category]);

  if (!subcategories) return <p>Loading...</p>;

  return (
    <>
      <SubcategoriesGrid category={category} />
      {subcategories.map((sub) => (
        <ProductCollection
          key={sub._id}
          subcategory={sub.slug}
          title={`Featured ${sub.name}`}
        />
      ))}
    </>
  );
}
