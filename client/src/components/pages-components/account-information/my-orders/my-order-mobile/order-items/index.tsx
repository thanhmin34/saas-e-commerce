import React from 'react'
import moment from 'moment'
// hooks
// styles
import styles from './styles.module.scss'
// components
import OrderItem from './OrderItem'
import Actions from './Actions'
import useIntl from '@hooks/useIntl'
import { IOrdersItem } from '@interfaces/user'
import Price from '@components/productItem/Price'
import { IStatusOrders, STATUS_COLOR } from '@constants/account'

export interface IOrderItemMobile {
  item: IOrdersItem
  onChangeOrder: (item: IOrdersItem | null) => void
}
const MyOrderItemMobile = ({ item, onChangeOrder }: IOrderItemMobile) => {
  const { localizeMessage } = useIntl()
  const { order_date, status, id: orderNumber, prices } = item || {}
  const { total_excl = 0 } = prices || {}
  const _dateTime = order_date ? moment(order_date).format('L') : ''

  const orderItem = [
    {
      name: `#${orderNumber}`,
      value: localizeMessage('Details'),
    },
    {
      name: localizeMessage('Order Date'),
      value: _dateTime,
    },
    // {
    //   name: localizeMessage('Items'),
    //   value: totalItem,
    // },
    {
      name: localizeMessage('Order Total'),
      value: <Price value={total_excl} />,
    },
    {
      name: localizeMessage('Status'),
      value: status,
      color: STATUS_COLOR[status as keyof IStatusOrders],
    },
  ]

  return (
    <div className={styles.myOrderItemMobile}>
      {orderItem.map((item, index) => {
        return <OrderItem key={index} item={item} />
      })}
      <Actions item={item} onChangeOrder={onChangeOrder} />
    </div>
  )
}

export default MyOrderItemMobile
