import React from 'react'
import { get } from 'lodash'
import styles from './styles.module.scss'
import { IPaymentMethodItemSelect, IPaymentMethodsItem } from '@interfaces/checkout'
import Image from 'next/legacy/image'

type Props = {
  onChangePaymentMethod: (paymentMethods: IPaymentMethodsItem) => void
  paymentMethodSelectedCode: string
  item: IPaymentMethodItemSelect
}

const PaymentMethodCart = (props: Props) => {
  const { item, paymentMethodSelectedCode, onChangePaymentMethod } = props || {}
  const selected = paymentMethodSelectedCode === item.code
  const { code, id, name } = item || {}

  const onChangePaymentMethodsPress = () => {
    onChangePaymentMethod({
      code,
      id,
      name,
    })
  }

  return (
    <div
      onClick={onChangePaymentMethodsPress}
      className={`${styles.paymentMethodsListItem} ${selected ? styles.active : ''} ${styles.itemPayment}`}
    >
      {get(item, 'icon[0].icon') && <Image alt="item" src={get(item, 'icon[0].icon')} priority={true} layout="fill" />}
    </div>
  )
}

export default PaymentMethodCart
