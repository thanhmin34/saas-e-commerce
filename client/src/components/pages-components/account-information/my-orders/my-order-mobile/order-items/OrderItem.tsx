import React from 'react'
import styles from './styles.module.scss'

interface IOrderItem {
  item: {
    value: string | React.JSX.Element
    name: string
    color?: string
  }
}
const OrderItem = (props: IOrderItem) => {
  const { item } = props
  const { value, name } = item || {}

  return (
    <div className={styles.myOrderRow}>
      <div className={styles.myOrderRowName}>{name}</div>
      <span style={{ background: '#fff' }} className={`${styles.myOrderRowValue}`}>
        {value}
      </span>
    </div>
  )
}

export default OrderItem
