import { IProductsList, IProductsListAction } from '../../interfaces/redux/product'

export const SET_PRODUCTS_LIST: string = 'SET_PRODUCTS_LIST'

export const setProductsList = (data: IProductsList) => {
  const action: IProductsListAction = {
    type: SET_PRODUCTS_LIST,
    data,
  }
  return action
}
