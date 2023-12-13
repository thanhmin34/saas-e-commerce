import {
  COLOR_STATUS_ORDER_CANCELED,
  COLOR_STATUS_ORDER_CLOSED,
  COLOR_STATUS_ORDER_COMPLETE,
  COLOR_STATUS_ORDER_DELIVERED,
  COLOR_STATUS_ORDER_PENDING,
  COLOR_STATUS_ORDER_PENDING_PAYMENT,
  COLOR_STATUS_ORDER_PROCESSING,
} from './colors'

export const LIST_ACCOUNT_MENU = {
  MY_ACCOUNT: 'my-account',
  LOGOUT: 'logout',
  MY_ORDERS: 'my-orders',
  MY_WISHLIST: 'my-wishlist',
  MY_REFUNDS: 'my-refunds',
  MY_ADDRESSES: 'my-addresses',
  MY_WALLET: 'my-wallet',
  CREDITS_SLIPS: 'credits-slips',
  DISABLE_ACCOUNT: 'disable-account',
  DELETE_ACCOUNT: 'delete-account',
  WALLET: 'wallet',
  REWARD_POINTS: 'reward-points',
}

export const LIST_BREADCRUMB_ACCOUNT = {
  MY_ACCOUNT: 'Profile',
  MY_ORDERS: 'My Orders',
  MY_WISHLIST: 'Wish List',
  MY_REFUNDS: 'Refund Lists',
  MY_ADDRESSES: 'Addresses list',
  CREDITS_SLIPS: 'Payment',
  DISABLE_ACCOUNT: 'Disable Account',
  DELETE_ACCOUNT: 'Delete Account',
  WALLET: 'Wallet',
  REWARD_POINTS: 'Reward Points',
}

export const GENDERS = [
  {
    id: '0',
    title: 'Male',
    code: 1,
    subTitle: 'male',
  },
  {
    id: '1',
    title: 'Female',
    code: 2,
    subTitle: 'female',
  },
]

export const MONTH_OPTIONS = [
  { label: 'January', value: '01', dataOfMonth: 31 },
  { label: 'February', value: '02', dataOfMonth: 28 },
  { label: 'March', value: '03', dataOfMonth: 31 },
  { label: 'April', value: '04', dataOfMonth: 30 },
  { label: 'May', value: '05', dataOfMonth: 31 },
  { label: 'June', value: '06', dataOfMonth: 30 },
  { label: 'July', value: '07', dataOfMonth: 31 },
  { label: 'August', value: '08', dataOfMonth: 31 },
  { label: 'September', value: '09', dataOfMonth: 30 },
  { label: 'October', value: '10', dataOfMonth: 31 },
  { label: 'November', value: '11', dataOfMonth: 30 },
  { label: 'December', value: '12', dataOfMonth: 31 },
]

export const VIEW_CONTENT_ADDRESS = {
  ADDRESS_LIST: 'address-list',
  CREATE_ADDRESS: 'create-address',
}

export const PAGE_SIZE = {
  MOBILE: 8,
  DESKTOP: 8,
}

export const DEFAULT_DISPLAY_PAGINATION = 8
export interface IStatusOrders {
  [key: string]: string
}

export const STATUS_ORDERS: IStatusOrders = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPING: 'shipping',
  DELIVERED: 'Delivered',
  CANCELLED: 'cancel',
  ON_HOLD: 'on hold',
  COMPLETE: 'complete',
  UNPAID: 'unpaid',
}

export const STATUS_NUMBER = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
}

export const STATUS_COLOR: IStatusOrders = {
  closed: COLOR_STATUS_ORDER_CLOSED,
  pending: COLOR_STATUS_ORDER_PENDING,
  unpaid: COLOR_STATUS_ORDER_PENDING_PAYMENT,
  canceled: COLOR_STATUS_ORDER_CANCELED,
  complete: COLOR_STATUS_ORDER_COMPLETE,
  delivered: COLOR_STATUS_ORDER_DELIVERED,
  processing: COLOR_STATUS_ORDER_PROCESSING,
}

export const TAB_ORDER = {
  ITEM_ORDER: 0,
  INVOICES: 1,
  ORDER_SHIPMENTS: 2,
  REVIEW_ORDER: 3,
}
export const TABS_TABLE = ['Items Ordered', 'invoices', 'Order Shipments', 'Review Ordered']

export const HEADER_ROW_ITEMS = ['Product Name', 'SKU', 'Price', 'Qty', 'Subtotal']
export const PAGE_RANGE_DISPLAYED = 3
export const TITLE_INFORMATION_ORDER = ['Shipping Address', 'Shipping Method', 'Billing Address', 'Payment Method']
