'use client'
import { useCallback, Fragment } from 'react'
import styles from './styles.module.scss'
import useDetectDevice from '@hooks/useDetectDevice'
import { DEVICE } from '@constants/device'

import { Item } from '../index'
import ProductName from '@components/productItem/ProductName'
import BrandName from '@components/productItem/BrandName'
import PriceBlock from '@components/productItem/PriceBlock'

const InformationContainer = ({ item }: { item: Item }) => {
  const { device } = useDetectDevice()
  const { name, brand_name, price } = item || {}

  const renderInformation = useCallback(() => {
    if (device === DEVICE.DESKTOP) {
      return (
        <div className={styles.informationContainer}>
          <div className={styles.informationContainerTop}>
            <ProductName productName={name}  />
            <div className={styles.priceContainer}>
              <PriceBlock price={price} />
            </div>
          </div>
          <BrandName brandName={brand_name} />
        </div>
      )
    }
    return (
      <div className={styles.informationContainer}>
        <ProductName productName={name} />
        <BrandName brandName={brand_name} />
        <div className={styles.priceContainer}>
          <PriceBlock price={price} />
        </div>
      </div>
    )
  }, [device])
  return <Fragment>{renderInformation()}</Fragment>
}

export default InformationContainer
