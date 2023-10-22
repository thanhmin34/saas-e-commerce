'use client'
import React from 'react'
import InformationContainer from './InformationContainer'
import styles from './styles.module.scss'
import ProductImage from './ProductImage'
import AddToCartButton from './AddToCartButton/index'
import WishlistButton from '@components/Wishlist/WishlistButton'
import ProductRatingBlock from './ProductRatingBlock'
import { ProductItemInterface } from '@interfaces/product'

const ProductItem = ({ item }: { item: ProductItemInterface }) => {
  const { image, rating_summary, review_count, out_of_stock } = item || {}
  const { url, label } = image || {}

  return (
    <div className={styles.productItemContainer}>
      <div className={styles.productItem}>
        <div className={styles.mainContainer}>
          <ProductImage className={styles.imageContainer} url={url} label={label} />
        </div>
        <InformationContainer item={item} />
        <div className={styles.actions}>
          <AddToCartButton isOutOfStock={!!out_of_stock} className={`${styles.atcButton} ${styles.hoverDisplayItem}`} />
          <WishlistButton />
        </div>
        <ProductRatingBlock ratingSummary={rating_summary} reviewCount={review_count} />
      </div>
    </div>
  )
}

export default ProductItem
