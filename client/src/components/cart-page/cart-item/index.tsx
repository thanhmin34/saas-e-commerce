import React from 'react'

//* Constants
import { DEVICE } from '@constants/device'
import useDetectDevice from '@hooks/useDetectDevice'
import NormalCartItem from '../normal-cart-item'

import { IProductsCart } from '@interfaces/redux/cart'

export default function CartItem({ item }: { item: IProductsCart }) {
  const content = <NormalCartItem item={item} />
  return <>{content}</>
}
