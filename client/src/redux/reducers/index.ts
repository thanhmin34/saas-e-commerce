//Reducer
import cartReducer from './cartReducer'
import configReducer from './configReducer'
import megaMenuReducer from './megaMenuReducer'
import userInfoReducer from './userInfoReducer'
import productsListReducer from './productsListReducer'

//Redux
import { CombinedState, Reducer, combineReducers } from 'redux'
import { IUserInfo, IUserInfoAction } from '@interfaces/redux/userInfo'
import { IProductsListAction, IProductsList } from '@interfaces/redux/product'

import { ConfigAction, IConfigApp } from '@interfaces/redux/config'
import { MegaMenu, MegaMenuAction } from '@interfaces/redux/megaMenu'
import { ICart, ICartAction } from '@interfaces/redux/cart'

const rootReducer: Reducer<
  CombinedState<{
    cartData: ICart
    configApp: IConfigApp
    megaMenu: MegaMenu | {}
    userInfo: IUserInfo
    productsList: IProductsList
  }>,
  ICartAction | ConfigAction | MegaMenuAction | IUserInfoAction | IProductsListAction
> = combineReducers({
  cartData: cartReducer,
  configApp: configReducer,
  megaMenu: megaMenuReducer,
  userInfo: userInfoReducer,
  productsList: productsListReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
