'use client'
import React from 'react'
import Button from '@components/button'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'

import { useRouter } from 'next/navigation'
import DiscountForm from './DiscountForm'
import SummaryContainer from './SummaryContainer'
import PriceInformationContainer from './PriceInformationContainer'
import { ROUTER_PATHS } from '@constants/routerPaths'

export default function CartCalculationArea() {
  const { push } = useRouter()
  const { localizeMessage } = useIntl()

  const checkoutDisabled = false

  return (
    <div className={styles.cartCalculationArea}>
      <div className={styles.priceSummaryContainer}>
        <SummaryContainer />
        <PriceInformationContainer />
        <DiscountForm />
        <Button className={styles.button} onClick={() => push(ROUTER_PATHS.CHECKOUT)}>
          {localizeMessage('Proceed to Checkout')}
        </Button>
      </div>
    </div>
  )
}
