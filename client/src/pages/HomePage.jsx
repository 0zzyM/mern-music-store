import PromotionBanner from "../components/PromotionBanner/PromotionBanner.jsx";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts.jsx";
import BestSellerProducts from "../components/BestSellers/BestSellerProducts.jsx";
import CategoriesGrid from "../components/Categories/CategoriesGrid.jsx";

export default function HomePage() {
  return (
    <>
      <PromotionBanner />
      <CategoriesGrid />
      <FeaturedProducts />
      <BestSellerProducts />
    </>
  );
}
