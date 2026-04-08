import "./App.css";
import Navbar from "./Navbar.jsx";
import PromotionBanner from "./PromotionBanner.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
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
