import React, { Fragment } from 'react'
import moment from 'moment'
import { get } from 'lodash'
// styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { IOrdersItem } from '@interfaces/user'
import Price from '@components/productItem/Price'
import { IStatusOrders, STATUS_COLOR } from '@constants/account'

const RowTable = (props: { item: IOrdersItem; onChangeOrder: (item: IOrdersItem | null) => void }) => {
  const { item, onChangeOrder } = props || {}
  const { id, status, order_date } = item || {}
  const { localizeMessage } = useIntl()

  const dateTime = get(item, 'order_date', '')
  const _dateTime = order_date ? moment(dateTime).format('L') : ''
  const priceTotal = get(item, 'prices.total_payment', 0)

  const orderInfo = [
    {
      id: 0,
      value: `#${id}`,
    },
    {
      id: 1,
      value: _dateTime,
    },
    {
      id: 2,
      value: <Price value={priceTotal} />,
    },
  ]

  const renderStatus = (
    <td>
      <span className={styles.statusOrder} style={{ background: STATUS_COLOR[status as keyof IStatusOrders] }}>
        {localizeMessage(status)}
      </span>
    </td>
  )

  const viewOrder = (
    <td className={styles.viewOrder}>
      <span onClick={() => onChangeOrder(item)}>{localizeMessage('View Order')}</span>
      <div className={styles.boundary}></div>
    </td>
  )

  const reOrder = (
    <td className={styles.reOrder}>
      <span className={styles.reOrderText} onClick={() => {}}>
        {localizeMessage('Reorder')}
      </span>
    </td>
  )

  return (
    <Fragment>
      <tbody className={styles.itemRow}>
        <tr>
          {orderInfo.map((item) => {
            return <td key={item.id}>{item?.value}</td>
          })}
          {renderStatus}
          {viewOrder}
          {reOrder}
        </tr>
      </tbody>
    </Fragment>
  )
}

export default RowTable
