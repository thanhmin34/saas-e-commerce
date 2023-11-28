import { useMemo } from 'react'
import ProductRating from './ProductRating'
import styles from './styles.module.scss'

interface PropsType {
  ratingSummary: number | undefined
  reviewCount: number | undefined
}

const ProductRatingBlock = ({ ratingSummary = 0, reviewCount = 0 }: PropsType) => {
  const rating = ratingSummary ? ratingSummary : 0

  const renderContent = useMemo(() => {
    if (rating && rating > 0) {
      return (
        <span className={styles.productRating}>
          <ProductRating ratingValue={rating} />
          <span>{`(${reviewCount})`}</span>
          <span className={styles.ratingText}>{rating.toFixed(1)}</span>
        </span>
      )
    } else {
      return (
        <span className={styles.productRating}>
          <ProductRating ratingValue={rating} />
          <span>{`(${reviewCount})`}</span>
        </span>
      )
    }
  }, [rating])

  return <>{renderContent}</>
}

export default ProductRatingBlock
