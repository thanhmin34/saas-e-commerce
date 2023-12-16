//Reducer
import cartReducer from './cartReducer'
import configReducer from './configReducer'
import megaMenuReducer from './megaMenuReducer'
import userInfoReducer from './userInfoReducer'
import productsListReducer from './productsListReducer'
import addressReducer from './addressReducer'
import wishlistReducer from './wishlistReducer'
import ordersReducer from './ordersReducer'

//Redux
import { CombinedState, Reducer, combineReducers } from 'redux'
import { ISignInAction, IUserInfoAction, IUserInfoData } from '@interfaces/redux/userInfo'
import { IProductsListAction, IProductsList } from '@interfaces/redux/product'

import { ConfigAction, IConfigApp } from '@interfaces/redux/config'
import { IMegaMenu, IMegaMenuAction } from '@interfaces/redux/megaMenu'
import { ICart, ICartAction } from '@interfaces/redux/cart'
import { IActionsAddress, IIniStateAddress } from '@interfaces/redux/address'
import { IActionsProductInWishlist, IProductInWishlistData } from '@interfaces/wishlist'
import { IActionsOrders, IInitStateOrders } from '@interfaces/user'

const rootReducer: Reducer<
  CombinedState<{
    cartData: ICart
    configApp: IConfigApp
    megaMenu: IMegaMenu | []
    userInfo: IUserInfoData
    productsList: IProductsList
    addressData: IIniStateAddress
    wishlistData: IProductInWishlistData
    ordersData: IInitStateOrders
  }>,
  | ICartAction
  | ConfigAction
  | IMegaMenuAction
  | IProductsListAction
  | IUserInfoAction
  | ISignInAction
  | IActionsAddress
  | IActionsProductInWishlist
  | IActionsOrders
> = combineReducers({
  cartData: cartReducer,
  configApp: configReducer,
  megaMenu: megaMenuReducer,
  userInfo: userInfoReducer,
  productsList: productsListReducer,
  addressData: addressReducer,
  wishlistData: wishlistReducer,
  ordersData: ordersReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
