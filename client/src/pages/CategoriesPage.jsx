import CategoriesGrid from "../components/Categories/CategoriesGrid.jsx";
import ProductCollection from "../components/ProductCollection/ProductCollection.jsx";

export default function CategoriesPage() {
  return (
    <>
      <CategoriesGrid />
      <CategoriesGrid />
      <ProductCollection
        isFeatured={true} // should enclose the boolean value in {}
        title="Featured Products"
      />
      <ProductCollection title="Best Sellers" sortOption="mostSold" />

      <ProductCollection title="New Arrivals" sortOption="newest" />
    </>
  );
}
