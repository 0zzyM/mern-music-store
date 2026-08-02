import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import CategoriesGrid from "../components/Categories/CategoriesGrid";
import ProductCollection from "../components/ProductCollection/ProductCollection";
import BrandCarousel from "../components/Brands/BrandCarousel";
import "../App.css";
import { ITEMS_PER_PAGE } from "../config.js";

export default function HomePage() {
  return (
    <>
      <PromotionBanner />
      <CategoriesGrid />
      <ProductCollection
        isFeatured={true} // should enclose the boolean value in {}
        title="Featured Products"
        limit={ITEMS_PER_PAGE}
      />
      <ProductCollection
        title="Best Sellers"
        sortOption="mostSold"
        limit={ITEMS_PER_PAGE}
      />

      <ProductCollection
        title="New Arrivals"
        sortOption="newest"
        limit={ITEMS_PER_PAGE}
      />

      <BrandCarousel />
    </>
  );
}
