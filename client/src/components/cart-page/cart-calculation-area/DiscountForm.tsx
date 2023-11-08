import { get } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
// hooks

import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'

const DiscountForm = () => {
  const { localizeMessage } = useIntl()
  const cart = useSelector((state: RootState) => state.cartData)

  const [couponCode, setCouponCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const doesCartHaveCoupon = useMemo(() => get(cart, 'applied_coupons'), [cart])
  const loading = false
  //   useEffect(() => {
  //     setErrorMessage(couponErrorsMessage)
  //   }, [couponErrorsMessage])

  //   useEffect(() => {
  //     if (doesCartHaveCoupon) {
  //       const couponFromCart = get(cart, 'applied_coupons[0].code')
  //       setCouponCode(couponFromCart)
  //     }
  //   }, [cart])

  async function handleApplyCoupon() {
    //
  }

  async function handleRemoveCoupon() {
    //
  }

  async function handleSubmitButton() {
    if (doesCartHaveCoupon) {
      await handleRemoveCoupon()
      return
    }
    await handleApplyCoupon()
  }

  const couponInputClassName = useMemo(
    () => `${styles.couponInput} ${errorMessage ? styles.error : ''}`,
    [errorMessage]
  )

  // render functions
  function renderSubmitButton() {
    return (
      <button
        className={styles.submitButton}
        onClick={() => {
          handleSubmitButton()
        }}
        disabled={false}
      >
        {loading
          ? localizeMessage('Submitting')
          : doesCartHaveCoupon
          ? localizeMessage('Remove')
          : localizeMessage('Apply')}
      </button>
    )
  }

  function renderCouponInput() {
    return (
      <input
        type="text"
        placeholder={localizeMessage('Apply discount code')}
        value={couponCode}
        onChange={(e) => {
          setCouponCode(e.target.value)
        }}
        disabled={doesCartHaveCoupon}
        className={couponInputClassName}
      />
    )
  }

  return (
    <div className={styles.discountForm}>
      {renderCouponInput()}
      {renderSubmitButton()}
      {errorMessage && <p className={styles.errorMessage}>{localizeMessage(errorMessage)}</p>}
    </div>
  )
}

export default DiscountForm
