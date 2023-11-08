'use client'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'
import styles from './styles.module.scss'
import SimplePrice from './SimplePrice'
import SpecialPrice from './SpecialPrice'

import { PriceTypes, RegularPriceTypes } from '@interfaces/product'
interface PriceBlock {
  price: number
  special_price?: RegularPriceTypes | null | undefined
}

const PriceBlock = ({ price, special_price }: PriceBlock) => {
  const isSimplePrice: boolean = useMemo<boolean>(() => {
    return isEmpty(special_price)
  }, [special_price])

  const renderPrice = isSimplePrice ? (
    <SimplePrice price={price} />
  ) : (
    <SpecialPrice special_price={special_price as RegularPriceTypes} />
  )
  return <div className={styles.priceContainer}>{renderPrice}</div>
}

export default PriceBlock
