'use client'
import React, { useRef } from 'react'
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import ReviewLineItem from './ReviewLineItem'
import PlaceOrderButton from './PlaceOrderButton'
import WrapperToggle from './WrapperToggle'
import CheckoutNote from './CheckoutNote'
import DiscountForm from '@components/pages-components/cart-page/cart-calculation-area/DiscountForm'

interface INotesProps {
  onAddNotes: (notes: string) => void
  notes: string
  onSubmitOrder: () => void
  isDisabled: boolean
}
const CheckoutReview = (props: INotesProps) => {
  const { onAddNotes, notes, onSubmitOrder, isDisabled } = props || {}
  const { localizeMessage } = useIntl()
  const cartFromRedux = useSelector((state: RootState) => state.cartData)
  const { currency } = useSelector((state: RootState) => state.configApp)

  const containerRef = useRef(null)
  // const checkoutContainer = document.getElementById('checkoutContainer')
  // const headerElement = document.querySelector('.header')

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

  // * Implement this for keep data in Checkout page when create cart after checkout
  // const [cart, updateCart] = useState<ICart | null>(null)

  // useEffect(() => {
  //   if (cartFromRedux && cartFromRedux.cart_id && cartFromRedux.total_quantity === 0) {
  //     return
  //   }
  //   updateCart(cartFromRedux)
  // }, [cartFromRedux])

  return (
    <div className={styles.review} id="checkoutReviewContainer" ref={containerRef}>
      <div className={styles.title}>{localizeMessage('Review your requests')}</div>
      <div className={styles.content}>
        {reviewLine.length > 0 && reviewLine.map((item, index) => <ReviewLineItem key={index} item={item} />)}
      </div>
      <div className={styles.discount}>
        <WrapperToggle title={'Use a discount code'}>
          <DiscountForm className={styles.discountFormInput} />
        </WrapperToggle>
        <WrapperToggle title={'Add a note'}>
          <CheckoutNote initialValue={notes} onSubmit={onAddNotes} />
        </WrapperToggle>
      </div>

      <PlaceOrderButton disabled={isDisabled} handleSubmit={onSubmitOrder} />
    </div>
  )
}

export default CheckoutReview
