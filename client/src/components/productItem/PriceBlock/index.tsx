'use client'
import { useCallback } from 'react'
import styles from './styles.module.scss'
import Price from '@components/productItem/Price'

interface Price {
  regularPrice: {
    amount: {
      currency: String
      value: number
    }
  }
}

const PriceBlock = ({ price }: { price: Price }) => {
  const { regularPrice } = price || {}
  const { amount } = regularPrice || {}
  const { value = 0, currency } = amount || {}
  const renderSimplePrice = useCallback(() => {
    return (
      <div>
        <Price value={value} currencyCode={currency} />
      </div>
    )
  }, [price])

  return <span className={styles.priceContainer}>{renderSimplePrice()}</span>
}

export default PriceBlock
