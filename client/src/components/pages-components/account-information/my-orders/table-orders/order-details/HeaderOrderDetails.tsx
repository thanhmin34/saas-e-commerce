import React from 'react'
import moment from 'moment'
// styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { IStatusOrders, STATUS_COLOR } from '@constants/account'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IOrdersItem } from '@interfaces/user'

interface IPropsHeaderDetails {
  data: {
    status: string
    orderDate: string
    orderId: number
  }
  onChangeOrder: (item: IOrdersItem | null) => void
}
const HeaderOrderDetails = (props: IPropsHeaderDetails) => {
  const { data, onChangeOrder } = props || {}
  const { status, orderDate, orderId } = data || {}
  const { localizeMessage } = useIntl()

  const _orderDate = orderDate ? moment(orderDate).format('DD-MMMM-YYYY') : ''

  return (
    <div className={styles.title}>
      <div className={styles.orderWrapper}>
        <div className={styles.orderTitle}>
          <h2>
            {localizeMessage('Orders')}
            <span className={styles.orderNumber}> {`#${orderId}`}</span>
          </h2>
          <span style={{ background: STATUS_COLOR[status as keyof IStatusOrders] }} className={styles.status}>
            {localizeMessage(status)}
          </span>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => onChangeOrder(null)} className={styles.back}>
            <div>
              <ArrowBackIcon width={12} />
            </div>
            <span>{localizeMessage('Back')}</span>
          </button>
        </div>
      </div>
      <span className={styles.timeOrder}>{_orderDate}</span>
    </div>
  )
}

export default HeaderOrderDetails
