import { ICart, ICartAction } from '@interfaces/redux/cart'
import { REMOVE_CART, SET_CART } from '@redux/actions/cartActions'

const initState: ICart = {
  cart_id: '',
  total_quantity: 0,
  price: {
    total: 0,
    total_excl: 0,
    total_payment: 0,
    tax_amount: 0,
    shipping_amount: 0,
    discount_amount: 0,
    currency: 'USD',
  },
  payment_methods: null,
  shipping_method: null,
  shipping_address: null,
  products: [],
}

const cartReducer = (state = initState, action: ICartAction) => {
  switch (action.type) {
    case SET_CART:
    case REMOVE_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
