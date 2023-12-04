export interface IUserInfo {
  firstname: string
  lastname: string
  id: number
  email: string | null
  phone_number: string | null
  gender: string | null
  birth_date: string | null
}

export interface IUserInfoData {
  userInfo: {} | IUserInfo
  isSignedIn: boolean
}
export interface IUserInfoAction {
  type: string
  payload: IUserInfo | {}
}

export interface ISignInAction {
  type: string
  payload: boolean
}
