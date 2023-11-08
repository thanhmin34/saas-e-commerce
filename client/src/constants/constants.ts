import { IFilterByProducts } from '@interfaces/global/global'

export const CACHE_TIME = 10 * 60 * 1000
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const BE_IMAGE_DOMAIN = process.env.NEXT_PUBLIC_BE_IMAGE_DOMAIN
export const HOST = process.env.NEXT_PUBLIC_HOST
// ttl 2 day
export const TTL = 60 * 60 * 48 * 1000
export const TWE = 150

export const SORT_PRODUCTS_OPTION = [
  {
    value: 'id',
    name: 'Position',
  },
  {
    value: 'name',
    name: 'Product Name',
  },
  {
    value: 'price',
    name: 'Price',
  },
]
export const PRICE_RANGE = [0, 500]

export const FILTER_BY_PRODUCTS_KEY = {
  CATEGORY: 'category',
  PRICE: 'price',
}

export const FILTER_BY_PRODUCTS: IFilterByProducts = {
  category: {
    key: 'filter_by_category_value',
    type: 'filter_by_category_type',
  },
  price: {
    key: 'filter_by_price_value',
    type: 'filter_by_price_type',
  },
}

export const DEFAULT_FILTER_BY_PRODUCTS = [
  {
    value: 0,
    ...FILTER_BY_PRODUCTS.price,
  },
  {
    value: 500,
    ...FILTER_BY_PRODUCTS.price,
  },
]