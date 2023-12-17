import { IImage } from '@interfaces/product/productDetails'

export interface SubCategoryItem {
  name: string
  slug: string
  id: number
}

export interface ISubCategory {
  name: string
  slug: string
  id: number
}

export interface Category {
  name: string
  children_category: ISubCategory[]
  image: IImage
  slug: string
}
export interface IProductInSearchParams {
  id: number
  name: string
  url_path: string
  image: IImage
}

export interface ISearchParams {
  products: IProductInSearchParams[]
  category: ISubCategory
  total_count: number
}
