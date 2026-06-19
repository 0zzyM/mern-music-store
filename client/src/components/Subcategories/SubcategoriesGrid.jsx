import SubcategoryCard from "./SubcategoryCard";
import "./Subcategories.css";
import { SERVER_URL } from "../../config.js";
import { useState, useEffect } from "react";

export default function SubcategoriesGrid({ category }) {
  const [subcategories, setSubcategories] = useState(null);

  useEffect(() => {
    const getSubcategories = async () => {
      const url = `${SERVER_URL}/api/v1/categories/${category}/subcategories`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setSubcategories(data);
      } catch (error) {
        console.error(`Error fetching ${url} `, error);
      }
    };
    getSubcategories();
  }, [category]);

  if (!subcategories) return <p>Loading...</p>;
  return (
    <div className="subcategories-container">
      {subcategories.map((subcategory) => {
        return (
          <SubcategoryCard key={subcategory._id} subcategory={subcategory} />
        );
      })}
    </div>
  );
}
