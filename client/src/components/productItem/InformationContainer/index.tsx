'use client'
import { useCallback, Fragment } from 'react'
import styles from './styles.module.scss'
import useDetectDevice from '@hooks/useDetectDevice'
import { DEVICE } from '@constants/device'

import ProductName from '@components/productItem/ProductName'
import BrandName from '@components/productItem/BrandName'
import PriceBlock from '@components/productItem/PriceBlock'
import { ProductItemInterface } from '@interfaces/product'

const InformationContainer = ({ item }: { item: ProductItemInterface }) => {
  const { device } = useDetectDevice()
  const { name, brand_name, price, special_price } = item || {}

  const renderInformation = useCallback(() => {
    if (device === DEVICE.DESKTOP) {
      return (
        <div className={styles.informationContainer}>
          <div className={styles.informationContainerTop}>
            <ProductName productName={name} />
            <div className={styles.priceContainer}>
              <PriceBlock
                price={price}
                special_price={{
                  max_price: price as number,
                  minimum_price: special_price as number,
                }}
              />
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
          <PriceBlock
            price={price}
            special_price={{
              max_price: price as number,
              minimum_price: special_price as number,
            }}
          />
        </div>
      </div>
    )
  }, [device])
  return <Fragment>{renderInformation()}</Fragment>
}

export default InformationContainer
