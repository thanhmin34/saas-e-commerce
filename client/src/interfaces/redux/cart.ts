export interface IPriceCart {
  total: number
  total_excl: number
  total_payment: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  currency: string
}

export interface IPaymentCart {}
export interface IShippingMethodCart {}
export interface IShippingAddressCart {}
export interface IProductsCart {
  product_id: number
  quantity: number
  price: number
  options: null
  name: string
  sku: string
  image: {
    label: string
    url: string
  }
}

export interface IDiscount {
  name: string
  code: string
  title: string
  description: string | null
  value: string | number
  start_date: string | null
  end_date: string | null
}

export interface ICart {
  cart_id: string
  total_quantity: number
  price: IPriceCart | null
  payment_methods: IPaymentCart | null
  shipping_method: IShippingMethodCart | null
  shipping_address: IShippingAddressCart | null
  products: IProductsCart[] | []
  discount: IDiscount | null
}

export interface ICartAction {
  type: string
  cart: ICart
}
