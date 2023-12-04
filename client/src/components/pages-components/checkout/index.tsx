'use client'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'
import Loading from '@components/loading'
import styles from './styles.module.scss'
import useCheckout from '@lib/checkout/useCheckout'
import { IPaymentMethods, IShippingMethods } from '@interfaces/checkout'

const CheckoutBanner = dynamic(() => import('./banner'), {
  ssr: false,
})

const InformationUser = dynamic(() => import('./information-user'), {
  ssr: false,
})

const CheckoutReview = dynamic(() => import('./review/CheckoutReview'), {
  ssr: false,
})

const CheckoutShippingAddress = dynamic(() => import('./shipping-address'), {
  ssr: false,
})

const PaymentMethod = dynamic(() => import('./payment-methods/PaymentMethod'), {
  ssr: false,
})

const CheckoutShippingMethod = dynamic(() => import('./shipping-method/ShippingMethod'), {
  ssr: false,
})

const CheckOutPage = () => {
  const {
    isLoading,
    shippingMethodList,
    shippingMethodSelected,
    onChangeShippingMethod,
    paymentMethodList,
    paymentMethodSelected,
    onChangePaymentMethod,
    onAddNotes,
    notes,
    onAddShippingAddress,
    shippingAddress,
    onSubmitOrder,
    isDisabled,
  } = useCheckout()

  return (
    <Fragment>
      <div className={styles.checkout}>
        <CheckoutBanner />
        <div className={styles.container}>
          <div className={styles.blockLeft}>
            <InformationUser />
            <CheckoutShippingAddress shippingAddress={shippingAddress} onAddShippingAddress={onAddShippingAddress} />
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
            <CheckoutReview
              notes={notes}
              onAddNotes={onAddNotes}
              onSubmitOrder={onSubmitOrder}
              isDisabled={isDisabled}
            />
          </div>
        </div>
        {/* <InfoBanner /> */}
      </div>
      {isLoading && <Loading />}
    </Fragment>
  )
}

export default CheckOutPage
