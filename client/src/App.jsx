import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import PromotionBanner from "./components/PromotionBanner/PromotionBanner.jsx";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts.jsx";
function App() {
  return (
    <>
      <Navbar />
      <PromotionBanner className="banner" />
      <FeaturedProducts />
    </>
  );
}

export default App;
