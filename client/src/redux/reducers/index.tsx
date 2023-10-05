//Reducer
import cartReducer from './cartReducer'

//Redux
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cartData: cartReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
