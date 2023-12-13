import React from 'react'

// styles
import styles from './styles.module.scss'

import useIntl from '@hooks/useIntl'
import { STATUS_ORDERS } from '@constants/account'
import useToastMessage from '@hooks/useToastMessage'
import Button from '@components/button'

const RateOrder = ({ orderId, status }: { orderId: number; status: string }) => {
  const { localizeMessage } = useIntl()
  const { showToast, typeToast } = useToastMessage()

  const handleRateOrder = async () => {
    try {
      // await handleSubmit({ orderNumber, star, message })

      if (status !== STATUS_ORDERS.COMPLETE) {
        showToast(localizeMessage('Status of order  is not suitable for feedback'), typeToast.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.RateOrder}>
      <div className={styles.rating}>
        {/* <InputRating rate={star} onChange={onChangeRating} name="star" size={16} countStar={setStar} /> */}
      </div>
      <h4 className={styles.subTitle}>{localizeMessage('Please share your opinion')}</h4>
      <div className={styles.content}>
        <textarea
          // value={message}
          // onChange={handleChangeMessage}
          className={styles.input}
          name="orderRate"
          id="order_rate"
          placeholder={localizeMessage('Description')}
          // disabled={comment}
        />
        <Button
          onClick={handleRateOrder}
          // disabled={isDisabledBtn}
          className={styles.buttonSubmit}
        >
          {localizeMessage('Save Review')}
        </Button>
      </div>
      {/* {loading && <Indicator />} */}
    </div>
  )
}

export default RateOrder
