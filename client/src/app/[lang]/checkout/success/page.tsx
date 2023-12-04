'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import useIntl from '@hooks/useIntl'
import { imageUrls } from '@constants/imageUrls'
import styles from './styles.module.scss'
import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'
import { ROUTER_PATHS } from '@constants/routerPaths'

const CheckoutSuccess = () => {
  const storage = new LocalStorageManager()
  const { localizeMessage, formatMessage } = useIntl()

  let storageData =
    typeof window !== 'undefined'
      ? storage.getItem(STORAGE_KEYS.ORDER_NUMBER)
        ? storage.getItem(STORAGE_KEYS.ORDER_NUMBER)
        : null
      : null
  const orderNumber = storageData ? storageData?.value : ''

  return (
    <div className={styles.orderStatus}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image priority src={imageUrls.checkoutOrderSuccess} alt="icon result checkout" width={80} height={80} />
        </div>
        <h1 className={styles.thankyou}>{localizeMessage('Thank you for your order')}</h1>
        <span className={styles.successfully}>
          {formatMessage({ id: 'Your order number {value} was completed successfully' }, { value: orderNumber })}
        </span>
      </div>
      <Link className={styles.continueShopping} href={ROUTER_PATHS.HOME}>
        {localizeMessage('Continue Shopping')}
      </Link>
    </div>
  )
}

export default CheckoutSuccess
