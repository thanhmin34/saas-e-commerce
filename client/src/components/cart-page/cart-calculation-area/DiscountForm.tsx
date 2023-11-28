import { get } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
// hooks

import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'
import useCoupon from '@lib/discount/useDiscount'

const DiscountForm = ({ className }: { className?: string }) => {
  const { localizeMessage } = useIntl()
  const cart = useSelector((state: RootState) => state.cartData)
  const { handleAddCoupon, handleRemoveCoupon, isLoading, error } = useCoupon()
  console.log('error', error)

  const [couponCode, setCouponCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const doesCartHaveCoupon = useMemo(() => get(cart, 'discount.code'), [cart])

  useEffect(() => {
    if (doesCartHaveCoupon) {
      setCouponCode(doesCartHaveCoupon)
    }
  }, [cart])

  async function handleApplyCoupon() {
    await handleAddCoupon({ code: couponCode })
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
        {isLoading
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
    <div className={`${styles.discountForm} ${className ? className : ''}`}>
      {renderCouponInput()}
      {renderSubmitButton()}
      {errorMessage && <p className={styles.errorMessage}>{localizeMessage(errorMessage)}</p>}
    </div>
  )
}

export default DiscountForm
