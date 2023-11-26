'use client'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'
import styles from './styles.module.scss'
import SimplePrice from './SimplePrice'
import SpecialPrice from './SpecialPrice'

import { PriceTypes, RegularPriceTypes } from '@interfaces/product'
import Price from '../Price'
interface PriceBlock {
  price: number
  special_price?: RegularPriceTypes | null | undefined
  className?: string
}

const PriceBlock = ({ price, special_price, className }: PriceBlock) => {
  const isSpecialPrice: boolean = useMemo<boolean>(() => {
    const { max_price, minimum_price } = special_price || {}
    return !!max_price && !!minimum_price
  }, [special_price])

  const renderPrice = !isSpecialPrice ? (
    <Price value={price} />
  ) : (
    <SpecialPrice special_price={special_price as RegularPriceTypes} />
  )
  return <div className={`${styles.priceContainer} ${className ? className : ''}`}>{renderPrice}</div>
}

export default PriceBlock
