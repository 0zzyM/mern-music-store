import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/categories/:category" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default App;
