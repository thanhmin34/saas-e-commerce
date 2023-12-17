import { ROUTER_PATHS } from './routerPaths'

export const TITLE_ACTIONS = {
  ACCOUNT: 'My Account',
  NO_LOGIN: 'Login',
  WISHLIST: 'Wishlist',
  CART: 'Cart',
}
export const RIGHT_HEADER_ACTIONS = [
  {
    title: TITLE_ACTIONS.NO_LOGIN,
    icon: 'https://media.9ten.cloud/media/global/logo/websites/10/Iconaccount.png',
    link: ROUTER_PATHS.LOGIN,
  },
  {
    title: TITLE_ACTIONS.ACCOUNT,
    icon: 'https://media.9ten.cloud/media/global/logo/websites/10/Iconaccount.png',
    link: `${ROUTER_PATHS.ACCOUNT_INFORMATION}`,
  },
  {
    title: TITLE_ACTIONS.WISHLIST,
    icon: 'https://media.9ten.cloud/media/global/logo/websites/10/wlist.png',
    link: `${ROUTER_PATHS.ACCOUNT_INFORMATION}#my-wishlist`,
  },
  {
    title: TITLE_ACTIONS.CART,
    icon: 'https://media.9ten.cloud/media/global/logo/websites/10/cart.png',
    link: ROUTER_PATHS.CART,
  },
]

export const LIST_SHOW_QTY = [TITLE_ACTIONS.WISHLIST, TITLE_ACTIONS.CART]

export const BREAK_POINTS_BANNER_SLIDER = {
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  410: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  767: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1023: {
    slidesPerView: 5,
    spaceBetween: 32,
  },
  1215: {
    slidesPerView: 6,
    spaceBetween: 50,
  },
}

export const BREAK_POINTS_PRODUCTS_SLIDER = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  410: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  767: {
    slidesPerView: 3,
    spaceBetween: 18,
  },
  1023: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1215: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
}
