import { useMemo } from 'react'
import ProductRating from './ProductRating'
import styles from './styles.module.scss'

interface PropsType {
  ratingSummary: number | null
  reviewCount: number | null
}

const ProductRatingBlock = ({ ratingSummary, reviewCount }: PropsType) => {
  const ratingDivisor = 20
  const rating = ratingSummary ? ratingSummary / ratingDivisor : null
  console.log('rating', rating)

  const renderContent = useMemo(() => {
    if (rating && rating > 0) {
      return (
        <span className={styles.productRating}>
          <ProductRating ratingValue={rating} />
          <span>({reviewCount})</span>
          <span className={styles.ratingText}>{rating.toFixed(1)}</span>
        </span>
      )
    } else {
      return (
        <span className={styles.productRating}>
          <ProductRating ratingValue={rating} />
          <span>({reviewCount})</span>
        </span>
      )
    }
    return <></>
  }, [rating])

  return <>{renderContent}</>
}

export default ProductRatingBlock
