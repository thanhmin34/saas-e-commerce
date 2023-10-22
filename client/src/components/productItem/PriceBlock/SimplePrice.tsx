'use client'

import { PriceTypes } from '@interfaces/product'
import styles from './styles.module.scss'

const SimplePrice = ({ price }: { price: PriceTypes }) => {
  const { value, currency } = price
  const renderPrice = `${value} ${currency}`
  return <span className={styles.price}>{renderPrice}</span>
}

export default SimplePrice
