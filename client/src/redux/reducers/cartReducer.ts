import { Cart, CartAction, REMOVE_CART, SET_CART } from '@redux/actions/cartActions'

const initState: Cart | {} = {}

const cartReducer = (state = initState, action: CartAction) => {
  switch (action.type) {
    case SET_CART:
    case REMOVE_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
