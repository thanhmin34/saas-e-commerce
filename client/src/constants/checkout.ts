import { DEFAULT_VALUE } from './map'
import { IShippingAddress } from '@interfaces/checkout'

export const PAYMENT_METHODS = {
  cod: 'cod',
  tabby: 'tabby_installments',
  tamara: 'tamara_pay_by_instalments',
  pay: 'pay',
  blp: 'blp',
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
