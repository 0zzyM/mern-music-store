import SubcategoryCard from "./SubcategoryCard";
import "./Subcategories.css";
import type { Subcategory } from "../../types/SubcategoryType";

export default function SubcategoriesGrid({
  subcategories,
}: {
  subcategories: Subcategory[];
}) {
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
