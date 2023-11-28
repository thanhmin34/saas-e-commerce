import { first, isEmpty } from 'lodash'
import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import PaymentMethodCart from './PaymentMethodCart'
import { IPaymentMethodItemSelect, IPaymentMethodsItem } from '@interfaces/checkout'

interface IPaymentMethodsListProps {
  onChangePaymentMethod: (paymentMethods: IPaymentMethodsItem) => void
  paymentMethodList: IPaymentMethodItemSelect[]
  paymentMethodSelectedCode: string
}

const PaymentMethodListSlider = (props: IPaymentMethodsListProps) => {
  const { paymentMethodList, paymentMethodSelectedCode = '', onChangePaymentMethod } = props || {}
  const renderPaymentList = (
    <div className={styles.list}>
      {!isEmpty(paymentMethodList) &&
        paymentMethodList.map((item: IPaymentMethodItemSelect) => {
          return (
            <Fragment key={item.id}>
              {item && (
                <div className={styles.paymentMethodsItem}>
                  <PaymentMethodCart
                    item={item}
                    onChangePaymentMethod={onChangePaymentMethod}
                    paymentMethodSelectedCode={paymentMethodSelectedCode}
                  />
                </div>
              )}
            </Fragment>
          )
        })}
    </div>
  )

  return (
    <div className={`${styles.paymentMethods} ${styles.paymentMethodsSlider}`}>
      <div className={styles.listMask}></div>
      <div className={styles.paymentMethodsContainer}>{renderPaymentList}</div>
    </div>
  )
}

export default PaymentMethodListSlider
