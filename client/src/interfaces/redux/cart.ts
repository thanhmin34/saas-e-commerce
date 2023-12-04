export interface IPriceCart {
  total: number
  total_excl: number
  total_payment: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  currency: string
}

export interface IPaymentCart {
  code: string
  id: number
  name: string
}
export interface IShippingMethodCart {
  code: string
  id: number
  name: string
  price: number
  unavailable?: boolean
  carrier_title?: string
}
export interface IShippingAddressCart {
  country: string
  city: string
  email: string
  street: string
  post_code: string
  phone: string
  cart_id?: number
  tempLatLng: {
    latitude: number
    longitude: number
  }
  address_number: string
  firstname: string
  lastname: string
  label: string
  region: string
}
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
  shipping_methods: IShippingMethodCart | null
  shipping_address: IShippingAddressCart | null
  products: IProductsCart[] | []
  discount: IDiscount | null
  notes: string
}

export interface ICartAction {
  type: string
  cart: ICart
}
