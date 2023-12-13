import { IActionsOrders, IOrdersItem } from '@interfaces/user'

export const SET_ORDERS = 'SET_ORDERS'

export const setOrders = (params: { orders: IOrdersItem[]; total_count: number }) => {
  const action: IActionsOrders = {
    type: SET_ORDERS,
    payload: params,
  }
  return action
}
