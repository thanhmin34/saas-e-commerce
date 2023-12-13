import React, { useMemo } from 'react'
import RateOrder from './RateOrder'
// styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { STATUS_ORDERS } from '@constants/account'

const ReviewOrder = ({ status, orderId }: { status: string; orderId: number }) => {
  const { localizeMessage } = useIntl()

  const isDisableReview = useMemo(() => status !== STATUS_ORDERS.COMPLETE, [status])

  const title = (
    <div className={styles.title}>
      {!isDisableReview ? (
        <>
          <h2>{localizeMessage('Rate Order and Write Your review')}</h2>
          <h4>{localizeMessage('Please write the overall level of satisfaction with your purchases')}</h4>
        </>
      ) : (
        <h4>
          <h2>
            {localizeMessage(
              'Please write the overall level of satisfaction with your purchases after when this order completed'
            )}
          </h2>
        </h4>
      )}
    </div>
  )

  return (
    <div className={styles.reviewOrder}>
      {title}
      {!isDisableReview && <RateOrder orderId={orderId} status={status} />}
    </div>
  )
}

export default ReviewOrder
