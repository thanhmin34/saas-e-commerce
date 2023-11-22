import React from 'react'
import { RegularPriceTypes } from '@interfaces/product'
import styles from './styles.module.scss'
import { SPACE_SYMBOL } from '@constants/symbol'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'

type PriceType = { special_price: RegularPriceTypes }

const SpecialPrice = ({ special_price }: PriceType) => {
  const { currency } = useSelector((state: RootState) => state.configApp)
  const { minimum_price, max_price } = special_price || {}

  const minimumPrice = `${minimum_price} ${currency}`
  const maxPrice = `${max_price} ${currency}`

  return (
    <span className={styles.price}>
      <span className={styles.oldPrice}>{maxPrice}</span>
      {SPACE_SYMBOL} - {SPACE_SYMBOL}
      <span>{minimumPrice}</span>
    </span>
  )
}

export default SpecialPrice
