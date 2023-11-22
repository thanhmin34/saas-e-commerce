'use client'
import React from 'react'
import InformationContainer from './InformationContainer'
import styles from './styles.module.scss'
import ProductImage from './ProductImage'
import AddToCartButton from './AddToCartButton/index'
import WishlistButton from '@components/Wishlist/WishlistButton'
import ProductRatingBlock from './ProductRatingBlock'
import { ProductItemInterface } from '@interfaces/product'
import Link from 'next/link'

const ProductItem = ({ item }: { item: ProductItemInterface }) => {
  const { image, rating_summary, review_count, out_of_stock, url_path } = item || {}
  const { url, label } = image || {}

  return (
    <div className={styles.productItemContainer}>
      <div className={styles.productItem}>
        <Link href={`/${url_path}`} className={styles.mainContainer}>
          <ProductImage className={styles.imageContainer} url={url} label={label} />
        </Link>
        <InformationContainer item={item} />
        <div className={styles.actions}>
          <AddToCartButton
            item={item}
            isOutOfStock={!!out_of_stock}
            className={`${styles.atcButton} ${styles.hoverDisplayItem}`}
          />
          <WishlistButton />
        </div>
        <ProductRatingBlock ratingSummary={rating_summary} reviewCount={review_count} />
      </div>
    </div>
  )
}

export default ProductItem
