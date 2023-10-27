import { IUserInfo, IUserInfoAction } from '@interfaces/redux/userInfo'

export const SET_USER_INFO = 'SET_USER_INFO'

export const setUserInfo = (userInfo: IUserInfo) => {
  const action: IUserInfoAction = {
    type: SET_USER_INFO,
    userInfo,
  }
  return action
}
