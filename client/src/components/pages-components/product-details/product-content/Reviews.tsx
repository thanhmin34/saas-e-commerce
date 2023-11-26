'use client'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import React, { useCallback, useState } from 'react'
// components

import useIntl from '@hooks/useIntl'
import { RootState } from '@redux/reducers'
import { DEMO_LIMIT, RATING } from '@constants/products'
import ProductRating from '@components/productItem/ProductRatingBlock/ProductRating'
import AddReviewModal from './AddReviewModal'
import { IProductReviewsData, IProductReviewsParams } from '@interfaces/product/productDetails'
import { formatDateTime } from '@utils/helper'
import Button from '@components/button'
import { BUTTON_TYPES } from '@constants/colors'
// constants/helper

interface IPropsReviews {
  reviewsData: IProductReviewsData
  productId: number
  handleRefetchReviews: () => void
}
const Reviews = ({ reviewsData, productId, handleRefetchReviews }: IPropsReviews) => {
  const { localizeMessage } = useIntl()
  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)
  const { total_rating: totalRating, review_count: totalCount, reviewList } = reviewsData || {}

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [totalShowAllComment, setTotalShowAllComment] = useState<number>(DEMO_LIMIT)

  const onLoadAllReviews = useCallback(
    (limit: number) => {
      setTotalShowAllComment(limit)
    },
    [totalShowAllComment]
  )
  const handleToggleModal = useCallback(() => {
    setIsShowModal((prev) => !prev)
  }, [isShowModal])

  const renderHeader = () => (
    <div className={styles.reviewHeader}>
      <h2>{localizeMessage('Reviews')}</h2>
      {!isSignedIn && (
        <Button buttonType={BUTTON_TYPES.OUTLINE} className={styles.addNewReviewBtn} onClick={handleToggleModal}>
          {localizeMessage('Add your review')}
        </Button>
      )}
    </div>
  )

  const renderRating = useCallback(
    () => (
      <div className={styles.rating}>
        <span className={styles.ratingPoint}>{`${totalRating ? totalRating : 0}/${RATING.MAX}`}</span>
        <ProductRating ratingValue={totalRating} />
        <div className={styles.ratingCount}>
          ({totalCount} {localizeMessage('Reviews')})
        </div>
      </div>
    ),
    [totalRating, totalCount]
  )

  const renderReviewList = useCallback(() => {
    return (
      reviewList?.length > 0 &&
      reviewList.slice(0, totalShowAllComment).map((item, index) => {
        const { message = '', user_name = '', createdAt = '', rating = 0 } = item || {}

        return (
          <div key={index} className={styles.singleReview}>
            <div className={styles.content}>
              <div className={styles.reviewName}>
                <span className={styles.username}>{user_name}</span>
                <span className={styles.date}>{formatDateTime(createdAt)}</span>
              </div>
              <div className={styles.userRating}>
                <ProductRating ratingValue={rating} />
              </div>
              <p className={styles.message}>{message}</p>
            </div>
          </div>
        )
      })
    )
  }, [reviewList, totalShowAllComment])

  const renderButton = () => {
    return (
      totalCount > DEMO_LIMIT &&
      reviewList.length !== totalShowAllComment && (
        <button onClick={() => onLoadAllReviews(reviewList.length)} className={styles.viewAllBtn}>
          {localizeMessage('Check all reviews')}
        </button>
      )
    )
  }

  return (
    <div className={styles.review}>
      {renderHeader()}
      {renderRating()}
      {renderReviewList()}
      {renderButton()}
      {isShowModal && (
        <AddReviewModal
          handleRefetchReviews={handleRefetchReviews}
          productId={productId}
          onClose={handleToggleModal}
          isOpen={isShowModal}
        />
      )}
    </div>
  )
}

export default Reviews
