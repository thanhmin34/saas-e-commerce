'use client'
import React from 'react'
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import styles from './styles.module.scss'
interface PlaceOrderButtonProps {
  disabled: boolean
  handleSubmit: () => void
}

const PlaceOrderButton = (props: PlaceOrderButtonProps) => {
  const { disabled, handleSubmit } = props || {}
  const { localizeMessage } = useIntl()

  return (
    <Button disabled={disabled} className={styles.buttonPlaceOrder} onClick={handleSubmit}>
      {localizeMessage('Place Order')}
    </Button>
  )
}

export default PlaceOrderButton
