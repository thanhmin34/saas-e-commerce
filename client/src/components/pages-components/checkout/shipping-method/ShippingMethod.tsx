import React from 'react'
import { map } from 'lodash'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import ShippingMethodCart from './ShippingMethodCart'
import { IShippingMethods, IShippingMethodsItem } from '@interfaces/checkout'

const CheckoutShippingMethod = (props: {
  shippingMethodList: IShippingMethods
  onChangeShippingMethod: (payment: IShippingMethodsItem) => void
  shippingMethodSelected: IShippingMethodsItem | null
}) => {
  const { localizeMessage } = useIntl()
  const { shippingMethodList, shippingMethodSelected, onChangeShippingMethod } = props || {}

  const renderShippingMethod = (
    <div className={styles.shippingMethodList}>
      {map(shippingMethodList?.data, (item, index) => {
        const { unavailable = false, code } = item || {}
        if (!!unavailable) {
          return null
        }
        const selected = shippingMethodSelected ? shippingMethodSelected?.code === code : false

        return (
          <ShippingMethodCart
            key={index}
            selected={selected}
            item={item}
            onChangeShippingMethod={onChangeShippingMethod}
          />
        )
      })}
    </div>
  )

  return (
    <div className={styles.checkoutShippingMethod}>
      <span className={styles.title}>{localizeMessage('Shipping Method')}</span>
      {renderShippingMethod}
    </div>
  )
}

export default CheckoutShippingMethod
