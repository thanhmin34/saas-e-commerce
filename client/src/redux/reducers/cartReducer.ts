import { REMOVE_CART, SET_CART } from '@redux/actions/cartActions'

const initState: {} = {}

const cartReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_CART:
      return action.payload
    case REMOVE_CART:
      return initState
    default:
      return state
  }
}

export default cartReducer
