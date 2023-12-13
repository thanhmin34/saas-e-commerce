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
