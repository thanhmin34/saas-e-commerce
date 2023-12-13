import React, { Fragment } from 'react'
// styles
import styles from './styles.module.scss'
import { IOrdersItem } from '@interfaces/user'
// components
import ItemOrderWrapper from './ItemOrderWrapper'
import TotalOrder from '../total-order/TotalOrder'
import ShippingAddress from './ShippingAddress'
import useIntl from '@hooks/useIntl'
import PaymentInformation from './PaymentMethods'

const ItemsOrder = ({ selectTabId, orderItem }: { selectTabId: number; orderItem: IOrdersItem }) => {
  const { products, shipping_address, payment_methods, shipping_methods } = orderItem || {}
  const { localizeMessage } = useIntl()
  return (
    <Fragment>
      <div className={styles.itemOrder}>
        <ItemOrderWrapper selectTabId={selectTabId} products={products || []} />
      </div>
      <div className={styles.contentView}>
        <h4 className={styles.title}>{localizeMessage('Address Information And Payment Methods')}</h4>
        <div className={styles.totalInfo}>
          <ShippingAddress shippingAddress={shipping_address} />
          <PaymentInformation paymentMethods={payment_methods} />
        </div>
      </div>
      <TotalOrder className={styles.total} orderItem={orderItem} />
    </Fragment>
  )
}

export default ItemsOrder
