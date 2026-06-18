import PromotionBanner from "../components/PromotionBanner/PromotionBanner.jsx";
import CategoriesGrid from "../components/Categories/CategoriesGrid.jsx";
import ProductCollection from "../components/ProductCollection/ProductCollection.jsx";
import BrandCarousel from "../components/Brands/BrandCarousel.jsx";
import "../App.css";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext.js";

export default function HomePage() {
  const { isSearching } = useContext(SearchContext);

  return (
    <div
      className="page-content"
      style={isSearching ? { filter: "blur(4px)" } : null}
    >
      <PromotionBanner />
      <CategoriesGrid />
      <ProductCollection
        isFeatured={true} // should enclose the boolean value in {}
        title="Featured Products"
      />
      <ProductCollection title="Best Sellers" sortOption="mostSold" />

      <ProductCollection title="New Arrivals" sortOption="newest" />

      <BrandCarousel />
    </div>
  );
}
