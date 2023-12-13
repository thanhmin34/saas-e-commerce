import React, { Fragment, useState } from 'react'
// constants
// styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import Tabs from '@components/uix/tabs'
import RateOrder from '../../table-orders/order-details/review-order/RateOrder'

interface IPropsReview {
  status: string
  orderId: number
}
const ReviewOrderMobile = (props: IPropsReview) => {
  const { localizeMessage } = useIntl()

  const content = () => (
    <Fragment>
      <div className={styles.reviewOrderTitle}>
        <h2>{localizeMessage('Rate Order and Write Your review')}</h2>
        <span className={styles.subTitle}>
          {localizeMessage('Please write the overall level of satisfaction with your purchases')}
        </span>
      </div>
      <RateOrder {...props} />
    </Fragment>
  )

  return (
    <div className={styles.itemOrderMobile}>
      <Tabs title={localizeMessage('Review Ordered')}>
        <div className={styles.itemOrderContent}>{content()}</div>
      </Tabs>
    </div>
  )
}

export default ReviewOrderMobile
