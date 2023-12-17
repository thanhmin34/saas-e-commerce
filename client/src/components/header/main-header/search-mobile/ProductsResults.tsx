'use client'
import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { IProductInSearchParams } from '@interfaces/category'
import { map } from 'lodash'
import Image from 'next/legacy/image'
import Link from 'next/link'
import Price from '@components/productItem/Price'

interface IPropsProductsResults {
  products: IProductInSearchParams[]
  onNavigate: () => void
  totalCount: number
  onClose: () => void
}

const ProductsResults = ({ products, onNavigate, totalCount, onClose }: IPropsProductsResults) => {
  const { localizeMessage, formatMessage } = useIntl()

  const renderProductsList = () => {
    return map(products?.slice(0, 3), (item) => {
      const { name = '', url_path = '', image } = item || {}
      const { url, label } = image || {}
      console.log('url_path', url_path)

      return (
        <Link href={`/${url_path}`} onClick={onClose} key={item?.id} className={styles.item}>
          <div className={styles.image}>
            <Image src={url} alt={label} layout="fill" priority />
          </div>
          <span></span>
          <h4>{name}</h4>
          <Price value={12} />
        </Link>
      )
    })
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>{formatMessage({ id: '{value} items' }, { value: totalCount || 0 })}</div>
      <div className={styles.resultsData}>
        <h3>{localizeMessage('PRODUCT SUGGESTIONS')}</h3>
        <div className={styles.productsList}>{renderProductsList()}</div>
        <span onClick={onNavigate} className={styles.viewMore}>
          {localizeMessage('view more')}
        </span>
      </div>
    </div>
  )
}

export default ProductsResults
