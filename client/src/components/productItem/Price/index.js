'use client'
import React from 'react'
import { SPACE_SYMBOL } from '@constants/symbol'

const Price = ({ value, currencyCode }) => {
  return (
    <span>
      <span>{value}</span>
      <span>{SPACE_SYMBOL}</span>
      {currencyCode}
    </span>
  )
}

export default Price
