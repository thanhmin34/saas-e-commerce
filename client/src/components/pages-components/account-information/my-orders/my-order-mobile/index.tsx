'use client'
import { map } from 'lodash'
import { useSelector } from 'react-redux'
import React, { useCallback, useState } from 'react'
import { IOrdersItem } from '@interfaces/user'
import { RootState } from '@redux/reducers'
import styles from './styles.module.scss'
import useMyOrders from '@lib/account-information/useMyOrder'
import MyOrderItemMobile from './order-items'
import OrderDetailsMobile from './order-details'
type Props = {}

const MyOrdersMobile = (props: Props) => {
  const { orders } = useSelector((state: RootState) => state.ordersData)
  const {} = useMyOrders({})

  const [orderItem, setOrderItem] = useState<IOrdersItem | null>(null)

  const onChangeOrder = useCallback(
    (item: IOrdersItem | null) => {
      setOrderItem(item)
    },
    [orderItem]
  )

  const renderOrdersList = () => (
    <div className={styles.myOrderListMobile}>
      {map(orders, (item) => (
        <MyOrderItemMobile item={item} key={item.id} onChangeOrder={onChangeOrder} />
      ))}
    </div>
  )

  const renderContent = () => {
    if (!!orderItem) {
      return <OrderDetailsMobile onChangeOrder={onChangeOrder} orderItem={orderItem} />
    }
    return renderOrdersList()
  }

  return <div>{renderContent()}</div>
}

export default MyOrdersMobile
