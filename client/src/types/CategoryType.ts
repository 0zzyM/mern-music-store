import type { Subcategory } from "./SubcategoryType";

export type Category = {
  _id?: string;
  name: string;
  slug: string;
  image?: string;
  description: string;
  subcategories: Subcategory[];
};

export type NavCategory = {
  name: string;
  slug: string;
  subcategories: { name: string; slug: string }[];
};
