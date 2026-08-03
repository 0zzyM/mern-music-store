import type { Brand } from "./BrandType";
import type { Category } from "./CategoryType";
import type { Subcategory } from "./SubcategoryType";

export type Product = {
  _id: string;
  name: string;
  brand: Brand;
  images: string[];
  price: number;
  stock: number;
  category: Category;
  subcategory: Subcategory;
  reviewCount: number;
  rating: number;
  isOnSale: boolean;
  isFeatured: boolean;
  discountAmount: number;
  details?: Record<string, string>;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};

export type ProductCollectionProps = {
  title: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  sortOption?: string;
  isFeatured?: boolean;
  limit?: number;
};

export type ProductQueryParams = Omit<ProductCollectionProps, "title">;
