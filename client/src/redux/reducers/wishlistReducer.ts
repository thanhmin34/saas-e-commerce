import { IActionsProductInWishlist, IProductInWishlistData } from '@interfaces/wishlist'
import { REMOVE_WISHLIST, SET_WISHLIST } from '@redux/actions/wishlistActions'

const initState: IProductInWishlistData = {
  wishlist: [],
}

const addressReducer = (state = initState, action: IActionsProductInWishlist) => {
  switch (action.type) {
    case SET_WISHLIST:
      return { ...state, wishlist: action.payload }
    case REMOVE_WISHLIST:
      return { ...state, wishlist: [] }
    default:
      return state
  }
}

export default addressReducer
