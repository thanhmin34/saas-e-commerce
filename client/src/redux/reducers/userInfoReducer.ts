import { ISignInAction, IUserInfo, IUserInfoAction, IUserInfoData } from '@interfaces/redux/userInfo'
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

const initState = {
  userInfo: {},
  isSignedIn: jsonToken ? !!jsonToken : false,
} satisfies IUserInfoData

type IAction = IUserInfoAction | ISignInAction

const userInfoReducer = (state = initState, action: IAction): IUserInfoData => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    case SET_IS_SIGN_IN:
      return { ...state, isSignedIn: !!action.payload }
    default:
      return state
  }
}

export default userInfoReducer
