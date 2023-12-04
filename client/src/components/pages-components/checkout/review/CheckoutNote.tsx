'use client'
import { get } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import styles from './styles.module.scss'

interface INoteProps {
  onSubmit: (notes: string) => void
  initialValue: string
}
const CheckoutNote = (props: INoteProps) => {
  const { onSubmit, initialValue = '' } = props

  const { localizeMessage } = useIntl()
  const [value, updateValue] = useState(initialValue)
  const cart = useSelector((state: RootState) => state.cartData)
  const cartNote = get(cart, 'notes')

  return (
    <div className={styles.inputElement}>
      <textarea
        value={value}
        placeholder={localizeMessage('Add a note')}
        onChange={(e) => updateValue(e.target.value)}
      />
      <Button
        disabled={!value || value === cartNote}
        onClick={() => {
          onSubmit(value)
        }}
      >
        {localizeMessage('Submit')}
      </Button>
    </div>
  )
}

export default CheckoutNote
