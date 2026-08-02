import { useParams } from "react-router-dom";
import SubcategoriesGrid from "../components/Subcategories/SubcategoriesGrid";
import ProductCollection from "../components/ProductCollection/ProductCollection.jsx";
import { useSubcategoriesOfCategory } from "../hooks/useSubcategories";

export default function CategoryPage() {
  const { category } = useParams();

  const {
    data: subcategories,
    isPending,
    isError,
  } = useSubcategoriesOfCategory(category!); //TODO:this is not a  good habbit but input is validated both on fe and be

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching subcategories of {category}</p>;

  return (
    <>
      <SubcategoriesGrid subcategories={subcategories} />
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
