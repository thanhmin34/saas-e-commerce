import React, { Fragment } from 'react'
// hooks
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { RootState } from '@redux/reducers'
import useIntl from '@hooks/useIntl'
import SimplePrice from '@components/productItem/PriceBlock/SimplePrice'

export default function PriceInformationContainer({}) {
  const { localizeMessage } = useIntl()
  const cart = useSelector((state: RootState) => state.cartData)
  const { price, discount } = cart || {}
  const { name } = discount || {}
  const { discount_amount, shipping_amount, tax_amount, total_payment, total_excl, total } = price || {}

  const priceInfo = [
    {
      label: localizeMessage('Cart Subtotal (Inc VAT)'),
      value: total || 0,
      className: '',
    },
    {
      label: localizeMessage('Shipping (Inc VAT)'),
      value: shipping_amount || 0,
      className: '',
    },
    {
      label: '',
      value: '',
      className: '',
      line: true,
    },
    {
      label: localizeMessage('Tax'),
      value: tax_amount || 0,
      className: styles.bold,
    },
    {
      label: name ? localizeMessage(name) : '',
      value: discount_amount || 0,
      className: styles.bold,
    },
    {
      label: localizeMessage('Order Total'),
      value: total_payment || 0,
      className: styles.bold,
    },
  ]

  const renderPrice = priceInfo.map((item, index) => {
    const { line, value, label, className } = item || {}
    if (line) {
      return <div key={index} className={styles.lineDivine} />
    }
    if (!label) return <Fragment key={index} />
    return (
      <div key={index} className={styles.line}>
        <span className={`${styles.label} ${className ? className : ''}`}>{label}</span>
        <span className={`${styles.price} ${className ? className : ''}`}>
          <SimplePrice price={+value} />
        </span>
      </div>
    )
  })

  return <Fragment>{renderPrice}</Fragment>
}
