import PromotionBanner from "../components/PromotionBanner/PromotionBanner.jsx";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts.jsx";
import BestSellerProducts from "../components/BestSellers/BestSellerProducts.jsx";

export default function HomePage() {
  return (
    <>
      <PromotionBanner />
      <FeaturedProducts />
      <BestSellerProducts />
    </>
  );
}
