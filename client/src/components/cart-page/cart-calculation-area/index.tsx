'use client'
import Button from '@components/button'
import useIntl from '@hooks/useIntl'
import { get } from 'lodash'

import React, { useEffect, useMemo } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import SummaryContainer from './SummaryContainer'
import PriceInformationContainer from './PriceInformationContainer'
import DiscountForm from './DiscountForm'
export default function CartCalculationArea() {
  const router = useRouter()
  const { localizeMessage } = useIntl()

  const checkoutDisabled = false

  return (
    <div className={styles.cartCalculationArea}>
      <div className={styles.priceSummaryContainer}>
        <SummaryContainer />
        <PriceInformationContainer />
        <DiscountForm />
        <Button onClick={() => {}}>{localizeMessage('Proceed to Checkout')}</Button>
      </div>
    </div>
  )
}
