export interface IUserInfo {
  userInfo: {}
}
export interface IUserInfoAction {
  type: string
  userInfo: IUserInfo
}

export interface ISignInAction {
  type: string
  isSignIn: boolean
}
