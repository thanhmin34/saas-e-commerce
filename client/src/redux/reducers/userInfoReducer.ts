import { ISignInAction, IUserInfo, IUserInfoAction } from '@interfaces/redux/userInfo'
import { SET_IS_SIGN_IN, SET_USER_INFO } from '@redux/actions/userInfoAction'
import LocalStorageManager from '@utils/simplePersistence'
import STORAGE_KEYS from '@constants/storageKeys'
const storage = new LocalStorageManager()

let jsonToken =
  typeof window !== 'undefined'
    ? storage.getItem(STORAGE_KEYS.TOKEN)
      ? !!storage.getItem(STORAGE_KEYS.TOKEN)
      : null
    : null

const initState: IUserInfo = {
  userInfo: {},
  isSignedIn: jsonToken ? !!jsonToken : false,
}

type IAction = IUserInfoAction | ISignInAction

const userInfoReducer = (state = initState, action: IAction): IUserInfo => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    // case SET_IS_SIGN_IN:
    //   return { ...state, isSignedIn: action.payload }
    default:
      return state
  }
}

export default userInfoReducer
