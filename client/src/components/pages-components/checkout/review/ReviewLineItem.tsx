import React from 'react'
import styles from './styles.module.scss'
import Price from '@components/productItem/Price'
import { IReviewsLine } from '@interfaces/checkout'

const ReviewLineItem = (props: { item: IReviewsLine }) => {
  const { item } = props || {}
  const { price = 0, label, strong, display = true } = item || {}

  return (
    display && (
      <div className={styles.lineItem}>
        <div className={`${styles.label} ${strong ? styles.strongText : ''}`}>{label}</div>
        <div className={`${styles.price} ${strong ? styles.strongText : ''}`}>
          <Price value={price} />
        </div>
      </div>
    )
  )
}

export default ReviewLineItem
