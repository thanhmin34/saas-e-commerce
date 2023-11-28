import React from 'react'
import styles from './styles.module.scss'
import Price from '@components/productItem/Price'
import { IShippingMethodsItem } from '@interfaces/checkout'

type Props = {
  selected: boolean
  item: IShippingMethodsItem
  onChangeShippingMethod: (payment: IShippingMethodsItem) => void
}

const ShippingMethodCart = (props: Props) => {
  const { selected, item, onChangeShippingMethod } = props || {}
  const { price = 0, carrier_title = '', name = '' } = item || {}

  return (
    <div
      className={`${styles.shippingMethodCard} ${selected ? styles.selectedCard : ''}`}
      onClick={() => onChangeShippingMethod(item)}
    >
      <div className={styles.leftContent}>
        <h4>{name}</h4>
        <h6>{carrier_title}</h6>
      </div>
      <div className={styles.rightContent}>
        <Price value={price} />
      </div>
    </div>
  )
}

export default ShippingMethodCart
