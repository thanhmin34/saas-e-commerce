'use client'
import React from 'react'
import InformationContainer from './InformationContainer'
import styles from './styles.module.scss'
import ProductImage from './ProductImage'
import AddToCartButton from './AddToCartButton/index'
import WishlistButton from '@components/wishlist/WishlistButton'
import ProductRatingBlock from './ProductRatingBlock'
import { ProductItemInterface } from '@interfaces/product'
import Link from 'next/link'
import { IProductInWishlist } from '@interfaces/wishlist'

const ProductItem = ({ item }: { item: ProductItemInterface | IProductInWishlist }) => {
  const { image, total_rating = 0, review_count = 0, out_of_stock, url_path, id } = item || {}
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
          <WishlistButton productId={id} />
        </div>
        <ProductRatingBlock ratingSummary={total_rating} reviewCount={review_count} />
      </div>
    </div>
  )
}

export default ProductItem
