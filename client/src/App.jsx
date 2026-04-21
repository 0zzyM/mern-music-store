import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import PromotionBanner from "./components/PromotionBanner/PromotionBanner.jsx";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts.jsx";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel.jsx";
function App() {
  return (
    <>
      <Navbar />
      <PromotionBanner />
      <FeaturedProducts />
    </>
  );
}

export default App;
