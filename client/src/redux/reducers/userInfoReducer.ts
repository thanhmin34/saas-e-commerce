import { IUserInfo, IUserInfoAction } from '@interfaces/redux/userInfo'
import { SET_USER_INFO } from '@redux/actions/userInfoAction'

const initState: IUserInfo = {
  userInfo: {},
}

type IAction = IUserInfoAction

const userInfoReducer = (state = initState, action: IAction) => {
  switch (action.type) {
    case SET_USER_INFO:
      return action.userInfo
    default:
      return state
  }
}

export default userInfoReducer
