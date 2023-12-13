'use client'
import React from 'react'

// styles
import styles from './styles.module.scss'
import { IProductItemByOrders } from '@interfaces/user'
import Price from '@components/productItem/Price'
import useIntl from '@hooks/useIntl'

const ProductItem = ({ item }: { item: IProductItemByOrders }) => {
  const { localizeMessage } = useIntl()
  const { sku = '', quantity, name = '', price } = item || {}

  const data = [
    {
      name: 'SKU',
      value: sku,
    },
    {
      name: 'Price',
      value: <Price value={price} />,
    },
    {
      name: 'Qty Ordered',
      value: quantity,
    },
    {
      name: 'Subtotal',
      value: '',
    },
  ]

  const renderItem = () =>
    data.map((item, index) => (
      <div key={index} className={styles.productItem}>
        <span>{localizeMessage(item.name)}</span>
        <span>{item.value}</span>
      </div>
    ))

  return (
    <div className={styles.ItemOrderList}>
      <div className={styles.orderRowItem}>
        <div className={styles.productName}>
          <span>{name}</span>
          {/* {options && (
            <div className={styles.options}>
              <Options options={options} />
            </div>
          )} */}
        </div>
        {renderItem()}
      </div>
    </div>
  )
}

export default ProductItem
