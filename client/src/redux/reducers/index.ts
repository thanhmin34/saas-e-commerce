//Reducer
import { Reducer } from 'redux'
import cartReducer from './cartReducer'
import configReducer from './configReducer'
import megaMenuReducer from './megaMenuReducer'
import userInfoReducer from './userInfoReducer'

//Redux
import { CombinedState, combineReducers } from 'redux'
import { Cart, CartAction } from '@redux/actions/cartActions'
import { ConfigAction, ConfigApp } from '@interfaces/redux/config'
import { MegaMenu, MegaMenuAction } from '@interfaces/redux/megaMenu'
import { IUserInfo, IUserInfoAction } from '@interfaces/redux/userInfo'

const rootReducer: Reducer<
  CombinedState<{
    cartData: Cart | {}
    configApp: ConfigApp | {}
    megaMenu: MegaMenu | {}
    userInfo: IUserInfo
  }>,
  CartAction | ConfigAction | MegaMenuAction | IUserInfoAction
> = combineReducers({
  cartData: cartReducer,
  configApp: configReducer,
  megaMenu: megaMenuReducer,
  userInfo: userInfoReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
