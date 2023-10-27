export const SET_CART = 'SET_CART'
export const REMOVE_CART = 'REMOVE_CART'

interface ProductItems {
  name: string
  quantity: number
}
export interface Cart {
  // items: ProductItems[]
  test: string
}

export interface CartAction {
  type: string
  cart: Cart | {}
}

export type DispatchType = (args: CartAction) => CartAction

export const setCart = (cart: Cart) => {
  const action: CartAction = {
    type: SET_CART,
    cart,
  }
  return action
}

export const removeCart = () => {
  const action: CartAction = {
    type: SET_CART,
    cart: {},
  }
  return action
}
