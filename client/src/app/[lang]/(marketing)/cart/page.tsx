'use client'
import dynamic from 'next/dynamic'
import Loading from '@components/loading'

const Cart = dynamic(() => import('@components/cart-page'), {
  loading: () => <Loading />,
  ssr: false,
})

const CartPage = () => {
  return <Cart />
}

export default CartPage
