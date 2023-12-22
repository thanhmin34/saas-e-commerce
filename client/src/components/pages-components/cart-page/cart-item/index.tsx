import React from 'react'
import NormalCartItem from '../normal-cart-item'

import { IProductsCart } from '@interfaces/redux/cart'

export default function CartItem({ item }: { item: IProductsCart }) {
  const content = <NormalCartItem item={item} />
  return <>{content}</>
}
