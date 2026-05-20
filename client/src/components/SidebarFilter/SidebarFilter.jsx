import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./SidebarFilter.css";
import { FiSearch } from "react-icons/fi";

export default function SidebarFilter() {
  const [brands, setBrands] = useState(null);
  const [letter, setLetter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const brandFilter = searchParams.get("brand");

  const changeLetter = (e) => {
    setLetter(e.target.value);
  };

  {
    /*FIXME: This function is not working as intended needs to be refactored. */
  }

  const toggleBrandFilter = (brand) => {
    if (!brandFilter) {
      searchParams.set("brand", brand);
      setSearchParams(searchParams);
    } else {
      if (brandFilter.includes(brand)) {
        searchParams.delete("brand", brand);
        searchParams.set(searchParams);
      }
      searchParams.set("brand", brand);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/brands");
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBrands();
  }, []);

  const filteredBrands =
    brands?.filter((brand) =>
      brand.name.toLowerCase().startsWith(letter.toLowerCase()),
    ) || [];

  console.log(brandFilter);

  if (!brands) return <p>Loading...</p>;

  return (
    <div className="sidebar-filter-wrapper">
      <div className="product-filter">
        <h3>Brands</h3>
        <div className="filter-content">
          <FiSearch className="filter-search-icon" />

          <input
            type="text"
            className="filter-search"
            placeholder="Search for a brand"
            onChange={changeLetter}
          />
          {filteredBrands.map((brand) => {
            return (
              <label className="filter-item">
                <input
                  type="checkbox"
                  className="filter-checkbox"
                  checked={brandFilter === brand.slug}
                  onChange={() => toggleBrandFilter(brand.slug)}
                />
                <p>{brand.name}</p>
                {/*TODO: Add Amount of products here later */}
              </label>
            );
          })}
        </div>
      </div>

      <div className="product-filter">
        <h3>Price</h3>
        <input
          type="text"
          className="filter-search"
          placeholder="Search for a brand"
          onChange={changeLetter}
        />

        {/*TODO: Add Price filtering later */}
      </div>

      <div className="product-filter">
        <h3>Availability</h3>
        <label className="filter-item">
          <input type="checkbox" name="" id="" />
          <p>In Stock</p>
        </label>
      </div>

      <hr />
    </div>
  );
}
