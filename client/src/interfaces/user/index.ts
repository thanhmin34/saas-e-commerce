export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

export type UserRegister = Omit<User, 'phone'>
