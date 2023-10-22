import React from 'react'
import { RegularPriceTypes } from '@interfaces/product'
import styles from './styles.module.scss'
import { SPACE_SYMBOL } from '@constants/symbol'

type PriceType = { special_price: RegularPriceTypes }

const SpecialPrice = ({ special_price }: PriceType) => {
  const { minimum_price, max_price } = special_price
  const minimumPrice = `${minimum_price.value} ${minimum_price.currency}`
  const maxPrice = `${max_price.value} ${max_price.currency}`
  return (
    <span className={styles.price}>
      <span className={styles.oldPrice}>{minimumPrice}</span>
      {SPACE_SYMBOL} - {SPACE_SYMBOL}
      <span>{maxPrice}</span>
    </span>
  )
}

export default SpecialPrice
