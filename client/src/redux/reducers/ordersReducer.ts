import { IActionsOrders, IInitStateOrders } from '@interfaces/user'
import { SET_ORDERS } from '@redux/actions/ordersActions'

const initState: IInitStateOrders = {
  orders: [],
}

const ordersReducer = (state = initState, action: IActionsOrders) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.payload }
    default:
      return state
  }
}

export default ordersReducer
