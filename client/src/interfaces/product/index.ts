interface Image {
  url: string
  label: string
}

export interface PriceTypes {
  value: number
  currency: string
}

export interface RegularPriceTypes {
  minimum_price: PriceTypes
  max_price: PriceTypes
}

export interface ProductItemInterface {
  image?: Image
  brand_name?: string | undefined
  name: string
  price: PriceTypes
  special_price?: RegularPriceTypes | null
  rating_summary?: number | undefined
  review_count?: number | undefined
  out_of_stock: boolean | undefined
}
