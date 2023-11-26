'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { renderFormatterPrice } from '@utils/helper'

const Price = ({ value = 0, className }: { value: number; className?: string }) => {
  const { currency } = useSelector((state: RootState) => state.configApp)

  return <div className={className ? className : ''}>{renderFormatterPrice(value, currency)}</div>
}

export default Price
