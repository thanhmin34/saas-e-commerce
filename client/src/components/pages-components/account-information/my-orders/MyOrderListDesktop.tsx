'use client'
import React, { Fragment, useCallback, useState } from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import OrderDetails from './table-orders/order-details'
import OrderGrid from './table-orders/order-grid'
import { IOrdersItem } from '@interfaces/user'

const MyOrderListDesktop = () => {
  const { localizeMessage } = useIntl()
  const [orderItem, setOrderItem] = useState<IOrdersItem | null>(null)

  const onChangeOrder = useCallback(
    (item: IOrdersItem | null) => {
      setOrderItem(item)
    },
    [orderItem]
  )

  return (
    <Fragment>
      {<h2 className={styles.titleOrder}>{localizeMessage('My Orders')}</h2>}
      {!!orderItem ? (
        <OrderDetails orderItem={orderItem} onChangeOrder={onChangeOrder} />
      ) : (
        <OrderGrid isShow={!!orderItem} onChangeOrder={onChangeOrder} />
      )}
    </Fragment>
  )
}

export default MyOrderListDesktop
