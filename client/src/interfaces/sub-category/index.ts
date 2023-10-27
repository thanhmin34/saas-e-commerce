export interface SubCategoryItem {
  name: string;
  slug: string;
  id: number;
}

export interface SubCategory {
  name: string;
  slug: string;
  id: number;
}

export interface Category {
  name: string;
  children_category: SubCategory[];
  image: string | undefined;
  slug: string;
}
