import { Fragment } from 'react'
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from 'react-icons/io'

interface PropsRating {
  ratingValue: number | null
}
const ProductRating = ({ ratingValue }: PropsRating) => {
  let rating = []

  for (let i = 0; i < 5; i++) {
    rating.push(<IoIosStarOutline key={i} size={15} className="product-content__rating star-icon" />)
  }
  if (ratingValue && ratingValue > 0) {
    for (let i = 0; i < ratingValue; i++) {
      rating[i] = <IoIosStar key={i} color={'#F9A000'} size={15} className="product-content__rating star-icon" />
    }
  }
  if (ratingValue && ratingValue % 1 !== 0) {
    const lastIndex = Math.floor(ratingValue)
    rating[lastIndex] = (
      <IoIosStarHalf key={lastIndex} color={'#F9A000'} size={15} className="product-content__rating star-icon" />
    )
  }

  return <Fragment>{rating}</Fragment>
}

export default ProductRating
