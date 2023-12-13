import React from 'react'
// styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { TITLE_INFORMATION_ORDER } from '@constants/account'
import { IOrdersItem } from '@interfaces/user'
//hooks

// constants/helper

const OrderInformationMobile = ({ orderItem }: { orderItem: IOrdersItem }) => {
  const { payment_methods, shipping_address, shipping_methods } = orderItem
  const { localizeMessage } = useIntl()
  const { phone, label } = shipping_address || {}
  const { name: shippingMethodsName } = shipping_methods || {}
  const { name: paymentMethodsName } = payment_methods || {}

  const data = [
    {
      title: TITLE_INFORMATION_ORDER[0],
      name: label,
      value: phone,
    },
    {
      title: TITLE_INFORMATION_ORDER[1],
      name: shippingMethodsName,
      value: '',
    },
    {
      title: TITLE_INFORMATION_ORDER[3],
      name: paymentMethodsName,
      value: '',
    },
  ]

  const blockInformation = (
    <div className={styles.orderInformationRow}>
      {data.map((item, index) => {
        const { title, name, value } = item || {}
        return (
          <div key={index} className={styles.orderInformationColumn}>
            <div className={styles.title}>{title}</div>
            <div className={styles.info}>
              <div className={styles.name}>{name}</div>
              <div>{value}</div>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className={styles.orderInformationMobile}>
      <h2 className={styles.titleOrderInformation}>{localizeMessage('Order Information')}</h2>
      <div>{blockInformation}</div>
    </div>
  )
}

export default OrderInformationMobile
