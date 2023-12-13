import React from 'react'
import { get, map } from 'lodash'
// styles
import styles from './styles.module.scss'
// components

import useIntl from '@hooks/useIntl'
import { IProductItemByOrders } from '@interfaces/user'
import Price from '@components/productItem/Price'
interface IPropsOrderItem {
  item: IProductItemByOrders
}
const OrderRowItem = (props: IPropsOrderItem) => {
  const { item } = props || {}
  const { price, quantity, sku = '', name = '' } = item || {}

  const _subTotal = price * quantity
  const data = [sku, <Price value={price} />, quantity, <Price value={+_subTotal.toFixed(2)} />]

  return (
    <div className={styles.orderRow}>
      <div className={styles.orderRowItem}>
        <span>{name}</span>
        {/* {options && <Options options={options} />} */}
      </div>
      {map(data, (item, index) => (
        <div key={index} className={styles.orderRowItem}>
          {item}
        </div>
      ))}
    </div>
  )
}

export default OrderRowItem
