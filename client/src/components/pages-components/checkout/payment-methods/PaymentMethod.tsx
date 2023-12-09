import { first, get } from 'lodash'
import React, { Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

import { RootState } from '@redux/reducers'
import { imageUrls } from '@constants/imageUrls'
import { IPaymentMethods, IPaymentMethodsItem } from '@interfaces/checkout'
import { PAYMENT_METHODS } from '@constants/checkout'
import { TABBY_WIDGET_CONFIG, TAMARA_WIDGET_CONFIG } from '@constants/variables'
import useIntl from '@hooks/useIntl'
import PaymentMethodListSlider from './PaymentMethodListSlider'

interface IPaymentMethodsProps {
  onChangePaymentMethod: (paymentMethods: IPaymentMethodsItem) => void
  paymentMethodList: IPaymentMethods
  paymentMethodSelected: IPaymentMethodsItem | null
}
const PaymentMethod = (props: IPaymentMethodsProps) => {
  const cart = useSelector((state: RootState) => state.cartData)
  const { localizeMessage } = useIntl()
  const { paymentMethodList, onChangePaymentMethod, paymentMethodSelected } = props || {}
  const grandTotal = useMemo(() => {
    const value = get(cart, 'prices.grand_total.value', 0)
    return value
  }, [cart])

  const invalidTabbyValue = grandTotal > TABBY_WIDGET_CONFIG.MAX_PRICE || grandTotal < TABBY_WIDGET_CONFIG.MIN_PRICE
  const invalidTamaraValue = grandTotal > TAMARA_WIDGET_CONFIG.MAX_PRICE || grandTotal < TAMARA_WIDGET_CONFIG.MIN_PRICE

  const paymentMethodItem = useMemo(() => {
    if (!first(paymentMethodList?.data)) return []

    const paymentMethodIcons = {
      [PAYMENT_METHODS.COD]: [
        {
          icon: imageUrls.codPayment,
          widthIcon: 20,
          heightIcon: 20,
        },
      ],
      [PAYMENT_METHODS.STRIPE]: [
        {
          icon: imageUrls.iconCheckoutStripe,
          widthIcon: 20,
          heightIcon: 20,
        },
      ],
      [PAYMENT_METHODS.CHECKOUT_COM]: [
        {
          icon: imageUrls.codPayment,
          widthIcon: 20,
          heightIcon: 20,
        },
      ],
    }

    return paymentMethodList?.data
      .map((item) => {
        const { code, name, id } = item || {}
        const icon = paymentMethodIcons[code] || []
        return { id, code, name, image: imageUrls.checkoutSelect, imageActive: imageUrls.checkoutSelectActive, icon }
      })
      .filter((item) => {
        const { code } = item || {}
        return !(
          (code === PAYMENT_METHODS.TABBY && invalidTabbyValue) ||
          (code === PAYMENT_METHODS.TAMARA && invalidTamaraValue)
        )
      })
  }, [paymentMethodList, invalidTabbyValue, invalidTamaraValue])

  const paymentMethodIntroduce = (paymentSelect: { name: string }) => {
    const { name } = paymentSelect || {}
    return (
      <Fragment>
        {name && (
          <div className={styles.paymentMethodsIntroduce}>
            <div className={styles.description}>{name}</div>
          </div>
        )}
      </Fragment>
    )
  }

  const paymentMethodSelect = () => {
    if (!paymentMethodSelected) return ''
    return paymentMethodIntroduce(paymentMethodSelected)
  }

  return (
    <div className={styles.paymentMethods}>
      <div className={styles.title}>3. {localizeMessage('Payment Methods')}</div>
      <p>{localizeMessage('Add your information for complete identification')}</p>
      <PaymentMethodListSlider
        onChangePaymentMethod={onChangePaymentMethod}
        paymentMethodSelectedCode={paymentMethodSelected?.code || ''}
        paymentMethodList={paymentMethodItem}
      />
      {paymentMethodSelect()}
    </div>
  )
}

export default PaymentMethod
