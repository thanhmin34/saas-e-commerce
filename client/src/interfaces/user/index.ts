import { IPaymentMethodsItem, IShippingAddress, IShippingMethodsItem } from '@interfaces/checkout'
import { IDiscount, IPriceCart } from '@interfaces/redux/cart'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

export type IUserLoginByEmail = Pick<User, 'email' | 'password'>

export type IUserRegisterByEmail = Omit<User, 'phone'>
export type IUserLoginByPhone = Pick<User, 'phone'>
export type IUserRegisterByPhone = Omit<User, 'email' | 'password'>
type ITypesVerify = 'login' | 'register'
export interface IVerifyLoginPhone {
  phone: string
  otp: string
  type: 'login' | 'register'
}

export interface IVerifyRegisterPhone extends IVerifyLoginPhone, Pick<User, 'firstName' | 'lastName'> {}
export type IVerifyByPhone = IVerifyLoginPhone | IVerifyRegisterPhone

export interface IUserInformationParams {
  firstname: string
  lastname: string
  email: string
  phone_number: string
  birth_date: string
  gender: string | null
  id: number
}

export interface IUserName {
  firstname: string
  lastname: string
}

export interface IUserNameContact {
  email: string
  phone_number: string
}

export interface IUserNameBirthDateAndGender {
  day: string
  month: string
  year: string
  gender: string
}

export interface IUserInformationValues extends IUserName, IUserNameContact, IUserNameBirthDateAndGender {}

export type UserRegister = Omit<User, 'phone'>

interface IOptionsBirthDate {
  label: string
  value: string | number
}

export type TNameBirthDate = 'day' | 'year' | 'month'
export interface IRenderInputBirthDate {
  title: TNameBirthDate
  options: IOptionsBirthDate[]
  values: UseFormRegisterReturn<'year' | 'day' | 'month'>
  disabled: boolean
  value: string | number
}

export interface IMyAddressItem {
  id: number
  customer_id: number
  country: string
  city: string
  street: string
  post_code: string
  phone: string
  email: string
  region: string
  tempLatLng: {
    latitude: number
    longitude: number
  }
  address_number: string
  label: string
  is_default_address: boolean
}

type TAddress = Omit<IMyAddressItem, 'id' | 'is_default_address' | 'email' | 'phone' | 'customer_id'>

export type TCreateAddressParams = Omit<IMyAddressItem, 'id' | 'customer_id'>

export interface IMyAddressContact extends Pick<IMyAddressItem, 'phone' | 'email'> {
  first_name: string
  last_name: string
  is_default_address: boolean
  address: TAddress
}

export interface IMyAddressList {
  address: IMyAddressItem[]
}
export interface IOrdersItemInfo {
  id: number
  customer_id: number
  status: string
  notes: string
  order_date: string
}

export interface IProductItemByOrders {
  product_id: number
  quantity: number
  price: number
  options: null | {}
  name: string
  sku: string
  image: {
    label: string
    url: string
  }
}
export interface IOrdersItem extends IOrdersItemInfo {
  shipping_address: IShippingAddress
  discount: IDiscount
  shipping_methods: IShippingMethodsItem
  payment_methods: IPaymentMethodsItem
  products: IProductItemByOrders[]
  prices: IPriceCart
}
export interface IActionsOrders {
  type: string
  payload: {
    orders: IOrdersItem[]
    total_count: number
  }
}

export interface IInitStateOrders {
  orders: IOrdersItem[] | []
  total_count: number
}

export interface IAddressInfo {
  icon: React.JSX.Element
  title: string
  value: string
}
