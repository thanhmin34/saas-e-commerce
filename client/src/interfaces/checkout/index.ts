export interface IShippingMethodsItem {
  code: string
  id: number
  name: string
  price: number
  unavailable: boolean
  carrier_title: string
}

export interface IPaymentMethodsItem {
  code: string
  id: number
  name: string
}

export interface IShippingMethods {
  data: IShippingMethodsItem[] | []
}

export interface IPaymentMethods {
  data: IPaymentMethodsItem[] | []
}

export interface IPaymentMethodItemSelect {
  id: number
  code: string
  name: string
  image: string
  imageActive: string
  icon: {
    icon: string
    widthIcon: number
    heightIcon: number
  }[]
}

export interface IReviewsLine {
  label: string
  price: number | undefined
  strong: boolean
  display: boolean
}

export interface IParamsAddShippingMethods {
  cart_id: string
  shipping_methods: {
    id: number
    name: string
    code: string
  }
}

export interface IParamsAddPaymentMethods {
  cart_id: string
  payment_methods: {
    id: number
  }
}
