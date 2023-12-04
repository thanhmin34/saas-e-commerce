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
