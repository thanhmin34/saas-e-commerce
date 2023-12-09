import { DEFAULT_VALUE } from './map'
import { IShippingAddress } from '@interfaces/checkout'

export const PAYMENT_METHODS = {
  COD: 'cod',
  TABBY: 'tabby_installments',
  TAMARA: 'tamara_pay_by_instalments',
  STRIPE: 'stripe',
  CHECKOUT_COM: 'checkoutCom',
}
export const DEFAULT_SHIPPING_ADDRESS: IShippingAddress = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  address_number: '',
  post_code: '',
  region: '',
  street: '',
  city: '',
  country: '',
  label: '',
  tempLatLng: DEFAULT_VALUE,
}
