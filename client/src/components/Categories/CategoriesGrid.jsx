import CategoryCard from "./CategoryCard";
import { useState, useEffect } from "react";

export default function CategoriesGrid() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const url = "http://localhost:5000/api/v1/categories";
      try {
        const res = await fetch(url);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(`Error fetching ${url} `, error);
      }
    };
    getCategories();
  }, []);

  if (!categories) return <p>Loading...</p>;
  return (
    <div className="categories-container">
      {categories.map((category) => {
        return <CategoryCard key={category._id} category={category} />;
      })}
    </div>
  );
}
