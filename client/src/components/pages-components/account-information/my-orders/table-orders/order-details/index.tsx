'use client'
import React, { useEffect } from 'react'
import { IOrdersItem } from '@interfaces/user'
import HeaderOrderDetails from './HeaderOrderDetails'
import TabOrderDetails from './tab-order-details'

interface IProps {
  orderItem: IOrdersItem
  onChangeOrder: (item: IOrdersItem | null) => void
}

const OrderDetails = (props: IProps) => {
  const { orderItem, onChangeOrder } = props || {}
  const { status, order_date: orderDate, id: orderId } = orderItem || {}
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <HeaderOrderDetails
        data={{
          status,
          orderDate,
          orderId,
        }}
        onChangeOrder={onChangeOrder}
      />

      <TabOrderDetails orderItem={orderItem} />
    </div>
  )
}

export default OrderDetails
