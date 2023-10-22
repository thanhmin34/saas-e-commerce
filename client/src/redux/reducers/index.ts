//Reducer
import { Reducer } from 'react'
import cartReducer from './cartReducer'

//Redux
import { CombinedState, combineReducers } from 'redux'

interface CartData {}

const rootReducer: Reducer<
  CombinedState<{
    cartData: CartData
  }>,
  CartData
> = combineReducers({
  cartData: cartReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
