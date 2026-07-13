import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";
import userEvent from "@testing-library/user-event";
import { SearchProvider } from "../../contexts/SearchProvider";

function ProductsProbe() {
  const location = useLocation();
  return <p>products page {location.search}</p>;
}

describe("NavbarSearch", () => {
  const fakeResults = {
    productResults: [
      { _id: "g1", name: "Stratocaster", price: 899, images: ["strat.jpg"] },
    ],
    categoryResults: [],
    subcategoryResults: [],
    brandResults: [{ _id: "b1", name: "Shure", image: "shure.jpg" }],
  };

  beforeEach(() => {
    const fakeResponse = {
      ok: true,
      json: async () => fakeResults,
    };
    const fakeFetch = vi.fn(async () => fakeResponse);
    vi.stubGlobal("fetch", fakeFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the navbar search bar", () => {
    render(
      <MemoryRouter>
        <SearchProvider>
          <NavbarSearch />
        </SearchProvider>
      </MemoryRouter>,
    );

    const searchBar = screen.getByRole("textbox", {
      name: "Search for a product, brand or category",
    });
    expect(searchBar).toBeInTheDocument();

    const searchBtn = screen.getByRole("button", { name: "Search" });
    expect(searchBtn).toBeInTheDocument();
  });

  it("clicks search bar and types 1 letter", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SearchProvider>
          <NavbarSearch />
        </SearchProvider>
      </MemoryRouter>,
    );

    const searchBar = screen.getByRole("textbox", {
      name: "Search for a product, brand or category",
    });

    await user.click(searchBar);
    await user.type(searchBar, "a");

    expect(searchBar).toHaveValue("a");
    await new Promise((r) => setTimeout(r, 350));
    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByText(/no results/i)).not.toBeInTheDocument();
  });

  it("searches 2 letters and gets the results", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SearchProvider>
          <NavbarSearch />
        </SearchProvider>
      </MemoryRouter>,
    );

    const searchBar = screen.getByRole("textbox", {
      name: "Search for a product, brand or category",
    });

    await user.click(searchBar);
    await user.type(searchBar, "St");

    expect(searchBar).toHaveValue("St");

    expect(await screen.findByText("Stratocaster")).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("q=St"));
  });

  it("searches 2 letters with no results and no result found text", async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        productResults: [],
        categoryResults: [],
        subcategoryResults: [],
        brandResults: [],
      }),
    });

    render(
      <MemoryRouter>
        <SearchProvider>
          <NavbarSearch />
        </SearchProvider>
      </MemoryRouter>,
    );

    const searchBar = screen.getByRole("textbox", {
      name: "Search for a product, brand or category",
    });

    await user.click(searchBar);
    await user.type(searchBar, "qr");

    expect(searchBar).toHaveValue("qr");

    expect(
      await screen.findByText(/No results found for "qr"/i),
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("q=qr"));
  });

  it("Shows no results when the server responds with an error", async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <MemoryRouter>
        <SearchProvider>
          <NavbarSearch />
        </SearchProvider>
      </MemoryRouter>,
    );

    const searchBar = screen.getByRole("textbox", {
      name: "Search for a product, brand or category",
    });

    await user.click(searchBar);
    await user.type(searchBar, "qr");

    expect(searchBar).toHaveValue("qr");

    expect(
      await screen.findByText(/No results found for "qr"/i),
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("q=qr"));
  });

  it("navigates to the products page on submit", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SearchProvider>
          <NavbarSearch />
          <Routes>
            <Route path="/" element={null} />
            <Route path="/products" element={<ProductsProbe />} />
          </Routes>
        </SearchProvider>
      </MemoryRouter>,
    );

    const searchBar = screen.getByRole("textbox", {
      name: "Search for a product, brand or category",
    });

    const searchButton = screen.getByRole("button", {
      name: "Search",
    });

    await user.click(searchBar);
    await user.type(searchBar, "st");
    await user.click(searchButton);

    expect(await screen.findByText(/products page \?q=st/)).toBeInTheDocument();
    expect(searchBar).toHaveValue("");
  });

  it("does not navigate if search qry length is less than 2 letters", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SearchProvider>
          <NavbarSearch />
          <Routes>
            <Route path="/" element={null} />
            <Route path="/products" element={<ProductsProbe />} />
          </Routes>
        </SearchProvider>
      </MemoryRouter>,
    );

    const searchBar = screen.getByRole("textbox", {
      name: "Search for a product, brand or category",
    });

    const searchButton = screen.getByRole("button", {
      name: "Search",
    });

    await user.click(searchBar);
    await user.type(searchBar, "a");
    await user.click(searchButton);

    expect(screen.queryByText(/products page/)).not.toBeInTheDocument();
    expect(searchBar).toHaveValue("a");
  });
});
