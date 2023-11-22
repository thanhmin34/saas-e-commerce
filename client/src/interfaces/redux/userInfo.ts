export interface IUserInfo {
  userInfo: {}
  isSignedIn: boolean
}
export interface IUserInfoAction {
  type: string
  payload: IUserInfo
}

export interface ISignInAction {
  type: string
  payload: boolean
}
