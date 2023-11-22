'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import Loading from '@components/loading'
import useIntl from '@hooks/useIntl'
import CartItemsContainer from './cart-item-container'
import CartCalculationArea from './cart-calculation-area'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'

const CartBanner = dynamic(() => import('./cart-banner'), {
  loading: () => <Loading />,
  ssr: false,
})

const Cart = () => {
  const [isQuantityEditing, setIsQuantityEditing] = useState(false)

  const { localizeMessage } = useIntl()
  const cart = useSelector((state: RootState) => state.cartData)
  const { total_quantity } = cart || {}
  return (
    <div className={`main-page ${styles.cartPage}`}>
      <CartBanner />
      <div className={styles.heading}>
        <h1 className={styles.heading}>{localizeMessage('Shopping Cart')}</h1>
      </div>
      <div className={styles.body}>
        <CartItemsContainer />
        {/* {Number(totalQuantity) !== 0 && <CartActionMobile />} */}
        {total_quantity > 0 && <CartCalculationArea />}
      </div>
      {/* <div className={styles.relatedProductContainer}>
        {relatedProducts && Array.isArray(get(relatedProducts, 'items')) && (
          <RelatedproductSection products={relatedProducts} title={relatedProducts?.block_title} />
        )}
      </div> */}
    </div>
  )
}

export default Cart
