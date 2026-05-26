import PromotionBanner from "../components/PromotionBanner/PromotionBanner.jsx";
import CategoriesGrid from "../components/Categories/CategoriesGrid.jsx";
import ProductCollection from "../components/ProductCollection/ProductCollection.jsx";
import BrandCarousel from "../components/Brands/BrandCarousel.jsx";

export default function HomePage() {
  return (
    <>
      <PromotionBanner />
      <CategoriesGrid />
      <ProductCollection
        isFeatured={true} // should enclose the boolean value in {}
        title="Featured Products"
      />
      <ProductCollection title="Best Sellers" sortOption="mostSold" />

      <ProductCollection title="New Arrivals" sortOption="newest" />

      <BrandCarousel />
    </>
  );
}
