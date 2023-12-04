import { ISignInAction, IUserInfo, IUserInfoAction } from '@interfaces/redux/userInfo'

export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_IS_SIGN_IN = 'SET_IS_SIGN_IN'

export const setUserInfo = (userInfo: IUserInfo | {}) => {
  const action: IUserInfoAction = {
    type: SET_USER_INFO,
    payload: userInfo,
  }
  return action
}

export const setIsSignIn = (isSignIn: boolean) => {
  const action: ISignInAction = {
    type: SET_IS_SIGN_IN,
    payload: isSignIn,
  }
  return action
}
