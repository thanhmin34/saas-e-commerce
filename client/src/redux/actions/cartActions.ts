import { ICart, ICartAction } from '@interfaces/redux/cart'

export const SET_CART = 'SET_CART'
export const REMOVE_CART = 'REMOVE_CART'

export const setCart = (cart: ICart) => {
  const action: ICartAction = {
    type: SET_CART,
    cart,
  }
  return action
}

export const removeCart = () => {
  const action: ICartAction = {
    type: SET_CART,
    cart: {
      cart_id: '',
      total_quantity: 0,
    },
  }
  return action
}
