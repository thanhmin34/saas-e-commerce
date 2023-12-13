'use client'
import React, { useEffect } from 'react'

// styles
import styles from './styles.module.scss'

import { IOrdersItem } from '@interfaces/user'
import HeaderOrderDetails from '../../table-orders/order-details/HeaderOrderDetails'
import ItemOrderMobile from '../tab-order/product-list'
import TotalOrder from '../../table-orders/order-details/total-order/TotalOrder'
import OrderInformationMobile from '../information-order'
import ReviewOrderMobile from '../review/ReviewOrderMobile'

export interface IPropsOrderDetails {
  orderItem: IOrdersItem
  onChangeOrder: (item: IOrdersItem | null) => void
}
const OrderDetailsMobile = ({ orderItem, onChangeOrder }: IPropsOrderDetails) => {
  const { order_date, id, status } = orderItem || {}
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <HeaderOrderDetails
        data={{
          orderDate: order_date,
          orderId: id,
          status,
        }}
        onChangeOrder={onChangeOrder}
      />
      <div className={styles.content}>
        <ItemOrderMobile orderItem={orderItem} />
        <ReviewOrderMobile status={status} orderId={id} />
        <TotalOrder orderItem={orderItem} className={styles.totalOrder} />
        <OrderInformationMobile orderItem={orderItem} />
      </div>
    </div>
  )
}

export default OrderDetailsMobile
