export type ProductResult = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  stock: number;
  isOnSale: boolean;
  discountAmount: number;
};

export type CategoryResult = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type SubcategoryResult = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type BrandResult = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type SearchSuggestions = {
  productResults: ProductResult[];
  categoryResults: CategoryResult[];
  subcategoryResults: SubcategoryResult[];
  brandResults: BrandResult[];
};
