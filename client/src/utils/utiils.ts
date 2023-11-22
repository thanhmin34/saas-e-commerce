import { IKeyofFilterByProducts } from '@interfaces/global'
import { FILTER_BY_PRODUCTS } from '../constants/variables'
import { IFilterProduct } from '@interfaces/product/productList'
import axios, { AxiosError } from 'axios'
import { isEmpty, map } from 'lodash'

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error)
}

export function filterByProductList(data: number[], key: string): IFilterProduct[] {
  const filterByProductList = map(data, (item: number) => ({
    value: item,
    ...FILTER_BY_PRODUCTS[key as IKeyofFilterByProducts],
  }))
  return filterByProductList
}
