import React, { Fragment, useState } from 'react'
import Model from '@components/model/Model'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import Image from 'next/legacy/image'
import { RATE } from '@constants/products'
import InputRating from '@components/uix/input-rating/InputRating'
import Button from '@components/button'
import useAddReviews from '@lib/reviews/useAddReviews'
import Loading from '@components/loading'
interface IProps {
  isOpen: boolean
  onClose: () => void
  image?: string
  productId: number
  handleRefetchReviews: () => void
}

const AddReviewModal = (props: IProps) => {
  const { onClose, isOpen, productId, image, handleRefetchReviews } = props || {}
  const { localizeMessage } = useIntl()
  const [starValue, setStarValue] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  const { handleSubmit, isLoading } = useAddReviews({ productId })

  const handleSubmitPress = () => {
    handleSubmit({ message: comment, user_name: userName, rating: starValue }, (status) => {
      if (status) {
        handleRefetchReviews()
        onClose()
      }
    })
  }

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setComment(value)
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserName(value)
  }

  const renderImage = () => {
    if (!image) return <Fragment />
    return (
      <div className={styles.modalImage}>
        <Image className={styles.img} alt="image" layout="fill" src={image as string} />
      </div>
    )
  }

  const renderBody = () => {
    return (
      <table className={styles.addReviewForm}>
        <tbody>
          <tr>
            <td className={styles.label}>{localizeMessage('Overall Rating:')}</td>
            <td>
              <InputRating name={RATE[0].id} rate={starValue} countStar={setStarValue} />
            </td>
          </tr>
          <tr>
            <td className={styles.label}>{localizeMessage('Review:')}</td>
            <td>
              <textarea
                rows={5}
                onChange={handleChangeTextArea}
                placeholder={localizeMessage('Tell us your opinion')}
                name="comment"
                value={comment}
                className="w-100"
              />
            </td>
          </tr>
          <tr>
            <td className={styles.label}>{localizeMessage('Customer:')}</td>
            <td>
              <input
                placeholder={localizeMessage('Customer Name')}
                type="text"
                className="inputTitle"
                value={userName}
                name="userName"
                onChange={handleChangeInput}
              />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  const renderButtonSubmit = () => (
    <Button className={styles.submitBtn} disabled={isLoading} onClick={handleSubmitPress} isDisableStyles>
      {localizeMessage('POST A REVIEW')}
    </Button>
  )

  return (
    <Model isOpen={isOpen} handleClose={onClose}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{localizeMessage('Product review')}</h3>
        <div className={styles.modalBody}>
          {renderImage()}
          {renderBody()}
          {renderButtonSubmit()}
          {isLoading && <Loading />}
        </div>
      </div>
    </Model>
  )
}

export default AddReviewModal
