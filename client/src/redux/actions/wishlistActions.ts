import { IActionsProductInWishlist, IProductInWishlist } from '@interfaces/wishlist'

export const SET_WISHLIST = 'SET_WISHLIST'
export const REMOVE_WISHLIST = 'REMOVE_WISHLIST'

export const setWishlist = (wishlist: IProductInWishlist[]) => {
  const action: IActionsProductInWishlist = {
    type: SET_WISHLIST,
    payload: wishlist,
  }
  return action
}

export const removeWishlist = (wishlist: []) => {
  const action: IActionsProductInWishlist = {
    type: REMOVE_WISHLIST,
    payload: wishlist,
  }
  return action
}
