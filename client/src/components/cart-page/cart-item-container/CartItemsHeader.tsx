import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'

const HEADER_CART_PAGE = [
  {
    title: 'Product Name',
    className: 'text-title name',
  },
  {
    title: 'Quantity',
    className: `${styles.textTitle} ${styles.quantity}`,
  },
  {
    title: 'Subtotal',
    className: `${styles.textTitle} ${styles.subtotal}`,
  },
]

const CartItemsHeader = () => {
  const { localizeMessage } = useIntl()
  return (
    <div className={styles.header}>
      {HEADER_CART_PAGE.map((i) => (
        <span key={i.title} className={i.className}>
          {localizeMessage(i.title)}
        </span>
      ))}
    </div>
  )
}

export default CartItemsHeader
