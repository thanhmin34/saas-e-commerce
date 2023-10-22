'use client'
import { useMemo } from 'react'
import Button from '@components/button'
import styles from './styles.module.scss'

const AddToCartButton = ({ className, isOutOfStock }: { className: string; isOutOfStock: boolean }) => {
  function onClick() {
    console.log('!@3')
  }

  const renderAddToCart = (
    <Button onClick={onClick} disabled={isOutOfStock} className={className}>
      {isOutOfStock ? 'Out Of Stock' : 'Add to cart'}
    </Button>
  )

  return <>{renderAddToCart}</>
}

export default AddToCartButton
