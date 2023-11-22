import React from 'react'
import { getTrackBackground, Range } from 'react-range'

import styles from './styles.module.scss'
import { IThumbProps, ITrackProps } from 'react-range/lib/types'
import PriceBlock from '@components/productItem/PriceBlock'
import { FILTER_BY_PRODUCTS, FILTER_BY_PRODUCTS_KEY, PRICE_RANGE } from '@constants/variables'
import { useProductsListContext } from '@context/productsListContext'
import { filter, forEach, isEmpty, map } from 'lodash'
import { filterByProductList } from '@utils/utiils'
import { getValuesFilterByKey } from '@utils/helper'

const swatchInPrice = '#149447'
const swatchOutPrice = '#ccc'

export default function FilterRange({}) {
  const { setFilterByProducts, filterByProducts } = useProductsListContext()
  const initialValues = getValuesFilterByKey(filterByProducts, FILTER_BY_PRODUCTS.price.key)

  function rangeTrack(props: ITrackProps, children: React.ReactNode, values: number[]) {
    return (
      <div className={styles.rangeSliderTrack}>
        <div
          ref={props.ref}
          className={styles.trackChildren}
          style={{
            background: getTrackBackground({
              values,
              colors: [swatchOutPrice, swatchInPrice, swatchOutPrice],
              min: PRICE_RANGE[0],
              max: PRICE_RANGE[1],
            }),
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  function buttonSelect(props: IThumbProps) {
    return (
      <div
        {...props}
        style={{
          ...props.style,
        }}
        className={styles.rangeSliderButton}
      />
    )
  }
  const renderPrice = (
    <div className={styles.rangeSliderValues}>
      <div>
        <PriceBlock price={PRICE_RANGE[0]} />
      </div>
      <div>
        <PriceBlock price={PRICE_RANGE[1]} />
      </div>
    </div>
  )

  const handleChangePrice = (values: number[]) => {
    if (!isEmpty(values)) {
      setFilterByProducts((prevData) => {
        const newData = filter(prevData, (item) => item.key !== FILTER_BY_PRODUCTS.price.key)
        const filterByPriceData = filterByProductList(values, FILTER_BY_PRODUCTS_KEY.PRICE)
        return [...newData, ...filterByPriceData]
      })
      // setValues(values)
    }
  }

  return (
    <>
      <div className={styles.rangeContainer}>
        <Range
          step={1}
          min={PRICE_RANGE[0]}
          max={PRICE_RANGE[1]}
          values={initialValues}
          onChange={(values) => {
            handleChangePrice(values)
          }}
          onFinalChange={(values) => {
            console.log('values find', values)
          }}
          renderTrack={({ props, children }) => rangeTrack(props, children, initialValues)}
          renderThumb={({ props }) => buttonSelect(props)}
        />
        {renderPrice}
      </div>
    </>
  )
}
