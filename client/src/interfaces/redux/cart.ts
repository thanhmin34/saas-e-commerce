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
export interface IProductsCart {}

export interface ICart {
  cart_id: string
  total_quantity: number
  price: IPriceCart
  payment_methods: IPaymentCart | null
  shipping_method: IShippingMethodCart | null
  shipping_address: IShippingAddressCart | null
  products: IProductsCart[] | []
}

export interface ICartAction {
  type: string
  cart: ICart
}
