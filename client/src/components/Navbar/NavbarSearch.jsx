import "./Navbar.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";
import { LuShoppingCart, LuSearch } from "react-icons/lu";
import { SearchContext } from "../../contexts/SearchContext.js";

export default function NavbarSearch() {
  const [searchIndex, setSearchIndex] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const { setIsSearching } = useContext(SearchContext);

  const hasNoResults =
    suggestions &&
    suggestions.productResults.length === 0 &&
    suggestions.categoryResults.length === 0 &&
    suggestions.subcategoryResults.length === 0 &&
    suggestions.brandResults.length === 0;

  const hasNoProductResults =
    suggestions && suggestions.productResults.length === 0;

  const hasNoCategoryAndBrandResults =
    suggestions &&
    suggestions.categoryResults.length === 0 &&
    suggestions.subcategoryResults.length === 0 &&
    suggestions.brandResults.length === 0;

  useEffect(() => {
    // IMPORTANT: debouncing so not every keystroke makes an API call
    const timer = setTimeout(() => {
      if (searchIndex.length < 2) {
        setSuggestions(null);
        setIsSearching(false);
        return;
      }
      const getSuggestions = async () => {
        try {
          const url = `http://localhost:5000/api/v1/search/suggest?q=${searchIndex}`;
          const res = await fetch(url);

          // If the search returns 404 set it to empty response
          if (!res.ok) {
            setSuggestions({
              productResults: [],
              categoryResults: [],
              subcategoryResults: [],
              brandResults: [],
            });
            setIsSearching(true);
            return;
          }
          const data = await res.json();
          setSuggestions(data);
          setIsSearching(true);
        } catch (error) {
          console.error(error);
          setIsSearching(false);
        }
      };
      getSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchIndex, setIsSearching]);
  return (
    <div className="page-search-bar-wrapper">
      <input
        type="text"
        onChange={(e) => {
          setSearchIndex(e.target.value);
        }}
        className="page-search-bar"
        placeholder="Search for a product brand or category"
      />
      {/*TODO: Add search function here */}
      <label className="header-search-icon">
        <LuSearch />
      </label>
      {suggestions && (
        <div
          className="search-bar-dropdown"
          style={
            hasNoProductResults || hasNoCategoryAndBrandResults || hasNoResults
              ? { width: "100%" }
              : { width: "120%", left: "-10%" }
          }
        >
          {hasNoResults ? (
            <p className="search-suggestion-item">
              No results found for "{searchIndex}"
            </p>
          ) : (
            <>
              {!hasNoCategoryAndBrandResults && (
                <div
                  className="search-dropdown-left"
                  style={
                    hasNoProductResults ? { width: "100%" } : { width: "70%" }
                  }
                >
                  {/*TODO: Consider adding keyword suggestions maybe*/}

                  {suggestions.brandResults.length > 0 && (
                    <div className="search-section">
                      <h4 className="search-suggestion-title">Brands</h4>
                      {suggestions.brandResults.map((brand) => (
                        <Link
                          to={`/products?brand=${brand.slug}`}
                          key={brand._id}
                          className="search-suggestion-item"
                        >
                          <img
                            className="search-suggestion-item-image"
                            src={brand.image}
                            alt={brand.name}
                          />
                        </Link>
                      ))}
                    </div>
                  )}

                  {suggestions.categoryResults.length > 0 && (
                    <div className="search-section">
                      <h4 className="search-suggestion-title">Categories</h4>
                      {suggestions.categoryResults.map((category) => (
                        <Link
                          to={`/categories/${category.slug}`}
                          key={category._id}
                          className="search-suggestion-item"
                        >
                          <div className="product-suggestion-item-details">
                            <p className="product-suggestion-item-title">
                              {category.name}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {suggestions.subcategoryResults.length > 0 && (
                    <div className="search-section">
                      <h4 className="search-suggestion-title">Subcategories</h4>
                      {suggestions.subcategoryResults.map((subcategory) => (
                        <Link
                          to={`/products?subcategory=${subcategory.slug}`}
                          key={subcategory._id}
                          className="search-suggestion-item"
                        >
                          <p className="product-suggestion-item-title">
                            {subcategory.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {!hasNoProductResults && (
                <div className="search-dropdown-right">
                  {suggestions.productResults.length > 0 && (
                    <div className="search-section">
                      <h4 className="search-suggestion-title">Products</h4>
                      {suggestions.productResults.map((product) => (
                        <Link
                          to={`/products/${product._id}`}
                          key={product._id}
                          className="search-suggestion-item"
                        >
                          <img
                            className="search-suggestion-item-image"
                            src={product.images[0]}
                            alt={product.name}
                          />
                          <div className="product-suggestion-item-details">
                            <p className="product-suggestion-item-title">
                              {product.name}
                            </p>
                            <p className="product-suggestion-item-price">
                              €{product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
