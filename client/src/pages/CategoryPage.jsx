import { useParams } from "react-router-dom";
import SubcategoriesGrid from "../components/Subcategories/SubcategoriesGrid.jsx";
import ProductCollection from "../components/ProductCollection/ProductCollection.jsx";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <>
      <SubcategoriesGrid category={category} />
      <ProductCollection
        category={category}
        isFeatured={true}
        title="Featured Products"
      />
      <ProductCollection
        category={category}
        title="Best Sellers"
        sortOption="mostSold"
      />
      <ProductCollection
        category={category}
        title="New Arrivals"
        sortOption="newest"
      />
    </>
  );
}
