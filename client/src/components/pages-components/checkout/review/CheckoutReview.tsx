'use client'
import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import { ICart } from '@interfaces/redux/cart'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import ReviewLineItem from './ReviewLineItem'
import PlaceOrderButton from './PlaceOrderButton'
import WrapperToggle from './WrapperToggle'
import CheckoutNote from './CheckoutNote'
import DiscountForm from '@components/cart-page/cart-calculation-area/DiscountForm'

const CheckoutReview = () => {
  const [numberOffset, setNumberOffset] = useState(0)
  const { localizeMessage } = useIntl()
  const cartFromRedux = useSelector((state: RootState) => state.cartData)
  const { currency } = useSelector((state: RootState) => state.configApp)

  const containerRef = useRef(null)
  // const checkoutContainer = document.getElementById('checkoutContainer')
  // const headerElement = document.querySelector('.header')
  const onPlaceOrder = () => {}

  // * Implement this for keep data in Checkout page when create cart after checkout
  const [cart, updateCart] = useState<ICart | null>(null)

  useEffect(() => {
    if (cartFromRedux && cartFromRedux.cart_id && cartFromRedux.total_quantity === 0) {
      return
    }
    updateCart(cartFromRedux)
  }, [cartFromRedux])

  //TODO: Should revert code after delete top header banner
  // useEffect(() => {
  //   if (window && typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
  //     if (checkoutContainer) {
  //       if (headerElement) {
  //         const heightHeader = parseInt(window.getComputedStyle(headerElement).getPropertyValue('height'))
  //         const rect = checkoutContainer.getBoundingClientRect()
  //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  //         // Number 15 is subtracted from top style 200 set statically on the class checkout review
  //         // and real top space with that element to the top of the site
  //         const numberOffset = rect.top + scrollTop - heightHeader - 15
  //         setNumberOffset(numberOffset)
  //       }
  //     }
  //   }
  // }, [checkoutContainer, headerElement])

  const { price } = cartFromRedux || {}

  const {
    discount_amount = 0,
    shipping_amount = 0,
    tax_amount: tax = 0,
    total_payment = 0,
    total_excl = 0,
    total = 0,
  } = price || {}

  const reviewLine = [
    {
      label: localizeMessage('Subtotal:'),
      price: total,
      strong: false,
      display: true,
    },
    {
      label: localizeMessage('Shipping (Inc VAT)'),
      price: shipping_amount,
      strong: false,
      display: true,
    },
    {
      label: localizeMessage('Tax'),
      price: tax,
      strong: false,
      display: true,
    },
    {
      label: localizeMessage('Discount Amount'),
      price: discount_amount,
      strong: false,
      display: !!discount_amount,
    },
    {
      label: localizeMessage('Grand Total'),
      price: total_payment,
      strong: true,
      display: true,
    },
  ]

  // const discountsFormatted =
  //   discounts?.length > 0 &&
  //   discounts.map((item) => {
  //     return {
  //       label: item.label,
  //       price: item.amount,
  //       strong: false,
  //     }
  //   })

  // handle scroll down
  // const handleStyleInBlockCheckoutReview = useCallback(() => {
  //   if (checkoutContainer && checkoutContainer?.offsetHeight) {
  //     if (window.scrollY < numberOffset) {
  //       containerRef.current.classList.remove('bottom-container')
  //       containerRef.current.classList.remove('sticky-container')
  //       return
  //     }

  //     if (window.scrollY < checkoutContainer?.offsetHeight + numberOffset - containerRef.current.clientHeight) {
  //       containerRef.current.classList.remove('bottom-container')
  //       containerRef.current.classList.add('sticky-container')
  //       return
  //     }

  //     containerRef.current.classList.add('bottom-container')
  //     containerRef.current.classList.remove('sticky-container')
  //   }
  // }, [containerRef, checkoutContainer, numberOffset])

  // useEffect(() => {
  //   handleStyleInBlockCheckoutReview()
  //   function handleScroll() {
  //     if (typeof window !== 'undefined') {
  //       handleStyleInBlockCheckoutReview()
  //     }
  //   }

  //   // Bind the event listener
  //   document.addEventListener('scroll', handleScroll)
  //   return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // }, [containerRef, checkoutContainer, paymentMethodSelected, handleStyleInBlockCheckoutReview])

  return (
    <div className={styles.review} id="checkoutReviewContainer" ref={containerRef}>
      <div className={styles.title}>{localizeMessage('Review your requests')}</div>
      <div className={styles.content}>
        {reviewLine.length > 0 && reviewLine.map((item, index) => <ReviewLineItem key={index} item={item} />)}
        {/* {discountsFormatted.length > 0 &&
          discountsFormatted.map((item, index) => <ReviewLineItem key={index} item={item} discount={true} />)} */}
      </div>
      <div className={styles.discount}>
        <WrapperToggle title={'Use a discount code'}>
          <DiscountForm className={styles.discountFormInput} />
        </WrapperToggle>
        <WrapperToggle title={'Add a note'}>
          <CheckoutNote initialValue="" onSubmit={(value: string) => {}} />
        </WrapperToggle>
      </div>

      <PlaceOrderButton disabled={false} handleSubmit={onPlaceOrder} />
    </div>
  )
}

export default CheckoutReview
