import { IFilterByProducts } from '@interfaces/global'

export const CACHE_TIME = 10 * 60 * 1000
export const STALE_TIME = 10 * 60 * 1000

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const BE_IMAGE_DOMAIN = process.env.NEXT_PUBLIC_BE_IMAGE_DOMAIN
export const HOST = process.env.NEXT_PUBLIC_HOST
// ttl 2 day
export const TTL = 60 * 60 * 48 * 1000
export const TWE = 150
export const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_BE_GOOGLE_APP_ID || '123456789'

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

export const SHARE_SOCIAL = [
  {
    name: 'facebook',
    enable: true,
    id_share_social: 'facebook',
    link: '/',
  },
  {
    name: 'instagram',
    enable: true,
    id_share_social: 'instagram',
    link: '/',
  },
  {
    name: 'twitter',
    enable: true,
    id_share_social: 'twitter',
    link: '/',
  },
  {
    name: 'whatApp',
    enable: true,
    id_share_social: 'whatApp',
    link: '/',
  },
  {
    name: 'linkedIn',
    enable: true,
    id_share_social: 'linkedIn',
    link: '/',
  },
]
export const TAMARA_WIDGET_CONFIG = {
  MIN_PRICE: 10,
  MAX_PRICE: 100,
}

export const TABBY_WIDGET_CONFIG = {
  MIN_PRICE: 10,
  MAX_PRICE: 100,
}

export const FORMAT_DATE_FILTER_RANGE = 'YYYY-MM-DD'

export const SIZE_ICON = {
  WIDTH_DEFAULT: 36,
  HEIGHT_DEFAULT: 36,
  WIDTH_SMALL: 20,
  HEIGHT_SMALL: 20,
}

export const TYPES_LANDING_PAGES = {
  SLIDER: 'imageSlider',
  BANNER_SLIDER: 'sliderBrand',
  PRODUCT_LIST: 'productList',
  BANNER: 'banner',
}
