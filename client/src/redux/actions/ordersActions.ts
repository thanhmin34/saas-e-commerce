import { IActionsOrders, IOrdersItem } from '@interfaces/user'

export const SET_ORDERS = 'SET_ORDERS'

export const setOrders = (orders: IOrdersItem[]) => {
  const action: IActionsOrders = {
    type: SET_ORDERS,
    payload: orders,
  }
  return action
}
