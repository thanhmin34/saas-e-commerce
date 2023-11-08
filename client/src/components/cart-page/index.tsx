'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import Loading from '@components/loading'
import useIntl from '@hooks/useIntl'
import CartItemsContainer from './cart-item'

const CartBanner = dynamic(() => import('./cart-banner'), {
  loading: () => <Loading />,
  ssr: false,
})

const Cart = () => {
  const [isQuantityEditing, setIsQuantityEditing] = useState(false)

  const { localizeMessage } = useIntl()
  return (
    <div className={`main-page ${styles.cartPage}`}>
      <CartBanner />
      <div className={styles.heading}>
        <h1 className={styles.heading}>{localizeMessage('Shopping Cart')}</h1>
      </div>
      <div className={styles.body}>
        <CartItemsContainer />
        {/* {Number(totalQuantity) !== 0 && <CartActionMobile />} */}
        {/* {totalQuantity > 0 && (
          <CartCalculationArea isQuantityEditing={isQuantityEditing} isNotEnoughQuantity={isNotEnoughQuantity} />
        )} */}
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
