import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { RootState } from './reducers'

const middlewares = [thunk]

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export type AppDispatch = typeof store.dispatch

export default store
