'use client'

import AddToCartModal from '@components/add-to-cart-modal'
import { IAddProductItem } from '@interfaces/cart'
import { ICart } from '@interfaces/redux/cart'
import useInitializeCart from '@lib/cart/useInitializeCart'
import { RootState } from '@redux/reducers'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CartContext = React.createContext<{
  handleAddCartToModal: (product: IAddProductItem) => void
}>({
  handleAddCartToModal: () => {},
})

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useSelector((state: RootState) => state.cartData)

  const [addToCartModal, setAddToCartModal] = useState<IAddProductItem | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const handleToggleModal = () => setShow((prev) => !prev)

  const handleAddCartToModal = (product: IAddProductItem) => {
    setAddToCartModal(product)
    setShow(true)
  }

  const { initializeCart } = useInitializeCart()

  useEffect(() => {
    ;(async function () {
      await initializeCart()
    })()
  }, [])

  const contentAddToCartModal = !!addToCartModal && (
    <AddToCartModal show={show} handleToggleModal={handleToggleModal} item={addToCartModal} />
  )

  return (
    <CartContext.Provider value={{ handleAddCartToModal }}>
      {contentAddToCartModal}
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider

export const useCartContext = () => useContext(CartContext)
