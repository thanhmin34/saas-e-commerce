'use client'
import React from 'react'
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'

import styles from './styles.module.scss'
import { imageUrls } from '@constants/imageUrls'
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import { ROUTER_PATHS } from '@constants/routerPaths'

import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'

const CheckoutFails = () => {
  const { push } = useRouter()
  const { localizeMessage, formatMessage } = useIntl()
  const storage = new LocalStorageManager()

  let storageData =
    typeof window !== 'undefined'
      ? storage.getItem(STORAGE_KEYS.ORDER_NUMBER)
        ? storage.getItem(STORAGE_KEYS.ORDER_NUMBER)
        : null
      : null

  const orderNumber = storageData ? storageData?.value : ''

  return (
    <div className={styles.container}>
      <div className={styles.blockImage}>
        <Image width={240} height={240} src={imageUrls.checkoutOrderError} alt="order-error" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{localizeMessage("Your order wasn't accepted.")}</h3>
        <div className={styles.description}>
          {formatMessage(
            {
              id: 'Difficulties arose with your order #{value} during the placing order process. We also advise you to return to shopping and place the order again',
            },
            {
              value: orderNumber,
            }
          )}
        </div>
        <Button className={styles.continueShopping} onClick={() => push(ROUTER_PATHS.HOME)}>
          {localizeMessage('Continue Shopping')}
        </Button>
      </div>
    </div>
  )
}

export default CheckoutFails
