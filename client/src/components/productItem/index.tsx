'use client'
import React from 'react'
import InformationContainer from './InformationContainer'
import styles from './styles.module.scss'
import ProductImage from './ProductImage'
import AddToCartButton from './AddToCartButton/index'
import WishlistButton from '@components/Wishlist/WishlistButton'
import ProductRatingBlock from './ProductRatingBlock'
interface Image {
  url: string
  label: string
}

interface Price {
  regularPrice: {
    amount: {
      currency: string
      value: number
    }
  }
}
export interface Item {
  image?: Image | undefined | null
  brand_name: String | undefined
  name: String | undefined
  price: Price
  rating_summary: number | null
  review_count: number | null
}

const ProductItem = ({ item }: { item: Item }) => {
  const { image, rating_summary, review_count } = item || {}
  const { url, label } = image || {}

  return (
    <div className={styles.productItemContainer}>
      <div className={styles.productItem}>
        <div className={styles.mainContainer}>
          <ProductImage className={styles.imageContainer} url={url} label={label} />
        </div>
        <InformationContainer item={item} />
        <div className={styles.actions}>
          <AddToCartButton className={`${styles.atcButton} ${styles.hoverDisplayItem}`} />
          <WishlistButton />
        </div>
        <ProductRatingBlock ratingSummary={rating_summary} reviewCount={review_count} />
      </div>
    </div>
  )
}

export default ProductItem
