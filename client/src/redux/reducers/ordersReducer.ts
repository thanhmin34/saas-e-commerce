import { IActionsOrders, IInitStateOrders } from '@interfaces/user'
import { SET_ORDERS } from '@redux/actions/ordersActions'

const initState: IInitStateOrders = {
  orders: [],
  total_count: 0,
}

const ordersReducer = (state = initState, action: IActionsOrders): IInitStateOrders => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default ordersReducer
