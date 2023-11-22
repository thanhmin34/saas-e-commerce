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
    name?: string
  }
}

export interface IAddProductToCart extends IAddProductItem {
  cart_id: string
}

export interface ICartItemForCartPage {
  product_id: number
  quantity: number
  price: number
  options: [] | null
  name: string
  sku: string
  image: {
    label: string
    url: string
  }
}
