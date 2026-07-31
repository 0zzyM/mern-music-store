import CategoryCard from "./CategoryCard";
import "./Categories.css";
import { useCategories } from "../../hooks/useCategories";

export default function CategoriesGrid() {
  const { data: categories, isPending, isError } = useCategories();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error Fetching Categories...</p>;

  return (
    <div className="categories-container">
      {categories.map((category) => {
        return <CategoryCard key={category._id} category={category} />;
      })}
    </div>
  );
}
