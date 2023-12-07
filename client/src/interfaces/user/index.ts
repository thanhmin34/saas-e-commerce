import { UseFormRegisterReturn } from 'react-hook-form'

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

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
