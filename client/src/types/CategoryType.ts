import type { Subcategory } from "./SubcategoryType";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
};
