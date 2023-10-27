interface CategoryItem {
  description: string;
  image: string | undefined;
  id: number;
  name: string;
  parent_id: number;
  slug: string;
  title: string | undefined;
  children_category: CategoryItem[] | [];
}

export interface MegaMenu {
  children_category: CategoryItem[];
}

export interface MegaMenuAction {
  type: string;
  megaMenu: MegaMenu;
}
