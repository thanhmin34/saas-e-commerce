'use client'
import React, { Fragment } from 'react'
import Loading from '@components/loading'
import styles from './styles.module.scss'
import CheckoutBanner from './banner'
import InformationUser from './information-user'
import CheckoutShippingAddress from './shipping-address'
import useCheckout from '@lib/checkout/useCheckout'
import CheckoutShippingMethod from './shipping-method/ShippingMethod'
import { IPaymentMethods, IShippingMethods } from '@interfaces/checkout'
import PaymentMethod from './payment-methods/PaymentMethod'
import CheckoutReview from './review/CheckoutReview'

const CheckOutPage = () => {
  const {
    isLoading,
    shippingMethodList,
    shippingMethodSelected,
    onChangeShippingMethod,
    paymentMethodList,
    paymentMethodSelected,
    onChangePaymentMethod,
  } = useCheckout()

  return (
    <Fragment>
      <div className={styles.checkout}>
        <CheckoutBanner />
        <div className={styles.container}>
          <div className={styles.blockLeft}>
            <InformationUser />
            <CheckoutShippingAddress />
            <CheckoutShippingMethod
              onChangeShippingMethod={onChangeShippingMethod}
              shippingMethodSelected={shippingMethodSelected}
              shippingMethodList={shippingMethodList as IShippingMethods}
            />
            <PaymentMethod
              paymentMethodList={paymentMethodList as IPaymentMethods}
              paymentMethodSelected={paymentMethodSelected}
              onChangePaymentMethod={onChangePaymentMethod}
            />
          </div>
          <div className={styles.blockRight}>
            <CheckoutReview />
          </div>
        </div>
        {/* <InfoBanner /> */}
      </div>
      {isLoading && <Loading />}
    </Fragment>
  )
}

export default CheckOutPage
