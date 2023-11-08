import { SET_PRODUCTS_LIST } from '@redux/actions/productsListAction'
import { IProductsListAction, IProductsList } from '../../interfaces/redux/product'

const initState: IProductsList = {
  products: [],
  total_count: 0,
  category: [],
}

const productsListReducer = (state = initState, action: IProductsListAction) => {
  switch (action.type) {
    case SET_PRODUCTS_LIST:
      return { ...state, ...action.data }
    default:
      return state
  }
}

export default productsListReducer
