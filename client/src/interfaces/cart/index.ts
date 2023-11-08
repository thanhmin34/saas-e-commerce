import { RegularPriceTypes } from '@interfaces/product'

export interface IAddProductItem {
  product: {
    id: number
    sku: string
    quantity: number
    image?: {
      label: string
      url: string
    }
    price?: number
    special_price?: number | null | undefined
  }
}

export interface IAddProductToCart extends IAddProductItem {
  cart_id: string
}
