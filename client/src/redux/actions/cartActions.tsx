import { Dispatch } from 'redux'
export const SET_CART = 'SET_CART'
export const REMOVE_CART = 'REMOVE_CART'

interface Cart {}

export const setCart = (cart: Cart): any => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_CART,
      payload: cart,
    })
  }
}

export const removeCart = (): any => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVE_CART,
      payload: null,
    })
  }
}
