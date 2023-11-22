import readingTime from 'reading-time'
import { extend, filter, forEach, isArray, isEmpty, map } from 'lodash'

import { ROUTER_PATHS } from '@constants/routerPaths'
import { IFilterProduct } from '@interfaces/product/productList'

export const toHTML = (str: string) => ({ __html: str })

export const getPageCriteria = (page_size: number, current_page: number): string => {
  if (page_size && current_page) {
    return `&&page_size=${page_size}&&current_page=${current_page}`
  }
  return ''
}

export const getSortCriteria = (order_name: string, order_value: string): string => {
  if (order_name && order_value) {
    return `&&order_name=${order_name}&&order_value=${order_value}`
  }
  return ''
}

interface IFilter {
  key: string
  value: number | number[]
  type: string | string[]
}
export const getFilterCriteria = <T extends IFilter>(filter: T[]): string => {
  let url = ''

  if (!isEmpty(filter)) {
    forEach(filter, (item) => {
      if (isArray(item.value)) {
        forEach(item.value, (value) => {
          url += `&&${item.key}_type=${item.type}&&${item.key}_value=${value}`
        })
        return
      }
      url += `&&${item.key}_type=${item.type}&&${item.key}_value=${item.value}`
      return
    })
  }
  return url
}

export const getValuesFilterByKey = (data: IFilterProduct[], key: string): number[] => {
  const values = filter(data, (item) => item.key === key)
  return map(values, (item) => item.value)
}

const unauthorizedPaths = [ROUTER_PATHS.LOGIN, ROUTER_PATHS.CREATE_ACCOUNT]

export const checkRouteUnauthorized = (path: string) => {
  return path && unauthorizedPaths.some((e) => e === path)
}

export const checkRouteNeedAuthorized = (path: string) => {
  const authRouters = [ROUTER_PATHS.ACCOUNT_INFORMATION, ROUTER_PATHS.WISH_LIST, ROUTER_PATHS.CHECK_OUT]
  if (authRouters.includes(path)) {
    return true
  }
  return false
}

export const getReadingTime = (text: string) => {
  return readingTime(text).text
}
