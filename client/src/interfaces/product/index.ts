import { IImage } from './productDetails'

export interface PriceTypes {
  value: number
  currency: string
}

export interface RegularPriceTypes {
  minimum_price: number
  max_price: number
}

export interface ProductItemInterface {
  id: number
  sku: string
  image: IImage
  media_gallery: IImage[]
  name: string
  price: number
  quantity: number
  type: string
  special_price: number | null
  total_rating: number | undefined
  review_count: number | undefined
  out_of_stock: boolean | undefined
  url_path: string
  special_to_date: string | null
  special_from_date: string | null
  brand_name: undefined | string
}
