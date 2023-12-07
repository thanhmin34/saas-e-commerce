export interface IImage {
  label: string
  url: string
}
export interface IMediaGallery {
  label: string
  url: string
  disabled: boolean
  position: number
}
export interface ISeoProduct {
  title: string
  keywords: string
  description: string
}

export interface IProductDetails {
  id: number
  sku: string
  name: string
  price: number
  description: string | null
  description_short: string | null
  special_price: number | null
  special_to_date: string | null
  special_from_date: string | null
  media_gallery: IMediaGallery[]
  quantity: number
  label: string | null
  type: string
  image: IImage
  seo: ISeoProduct | null
  brand: string | null
  wishlist_id: number | null
  url_path: string
  out_of_stock: boolean
  createdAt: string
  updatedAt: string
  total_rating: number
  review_count: number
}

export interface IProductItemProps {
  product: IProductDetails
}

export interface IProductReviewsItem {
  id?: number
  user_name: string
  message: string
  rating: number
  product_id: number
  createdAt?: string
}
export type IProductReviewsParams = Omit<IProductReviewsItem, 'createdAt' | 'id' | 'product_id'>

export interface IProductReviewsData {
  reviewList: IProductReviewsItem[]
  total_rating: 2
  review_count: 1
}
