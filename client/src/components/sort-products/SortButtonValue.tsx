import Image from 'next/image'
import styles from './styles.module.scss'
import { imageUrls } from '@constants/imageUrls'
import React, { useCallback, useMemo } from 'react'
import { SORT_DEFAULTS_VALUES } from '@constants/products'
import { useProductsListContext } from '@context/productsListContext'

const SortButtonValue = () => {
  const { sortByProducts, setSortByProducts } = useProductsListContext()
  const { order_value } = sortByProducts || {}

  const handleSortProducts = useCallback(() => {
    setSortByProducts((prevData) => {
      const order_value =
        prevData.order_value === SORT_DEFAULTS_VALUES.INCREMENT
          ? SORT_DEFAULTS_VALUES.DECREASE
          : SORT_DEFAULTS_VALUES.INCREMENT

      return { ...prevData, order_value }
    })
  }, [order_value])

  const renderClassName = useMemo(() => {
    if (order_value === SORT_DEFAULTS_VALUES.DECREASE) {
      return `${styles.sortIcon}`
    }
    return `${styles.sortIcon} ${styles.sortIconIncrement}`
  }, [order_value])

  return (
    <div onClick={handleSortProducts} className={`${renderClassName}`}>
      <Image src={imageUrls.iconSort} alt="icon-sort" width={24} height={24} priority={true} />
    </div>
  )
}

export default SortButtonValue
