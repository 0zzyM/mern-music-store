import ProductCarousel from "../ProductCarousel/ProductCarousel";
import type { ProductCollectionProps } from "../../types/ProductType";
import { ITEMS_PER_PAGE } from "../../config";
import { useProducts } from "../../hooks/useProducts";

export default function ProductCollection({
  title,
  category,
  subcategory,
  sortOption,
  isFeatured,
  limit = ITEMS_PER_PAGE, //Give limit if no limit default to ITEMS_PER_PAGE
}: ProductCollectionProps) {
  const params = { category, subcategory, sortOption, isFeatured, limit };

  const { data, isPending, isError } = useProducts(params);

  if (isPending) return <p>Loading...</p>;

  if (isError) return <p>Error fetching products</p>;

  const products = data.products;

  if (products.length === 0) return <p>No product Found...</p>;

  const viewAllParams = new URLSearchParams();
  if (subcategory) viewAllParams.set("subcategory", subcategory);
  else if (category) viewAllParams.set("category", category); //if category and subcategory both exist weird URL will show up, nothing breaks but not consistent
  if (sortOption) viewAllParams.set("sort", sortOption);
  if (isFeatured) viewAllParams.set("isFeatured", "true");

  return (
    <ProductCarousel
      products={products}
      title={title}
      viewAllLink={`../products?${viewAllParams}`}
    />
  );
}
