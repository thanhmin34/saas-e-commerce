export interface SubCategoryItem {
  name: string
}

export interface SubCategory {
  data?: SubCategoryItem[]
  image_url?: string | undefined
}

export interface Category {
  name: string
  sub_category: SubCategory
}
