'use client'
import { useMemo } from 'react'
import Button from '@components/button'
import styles from './styles.module.scss'

const AddToCartButton = ({ className }: { className: string }) => {
  const disabled = useMemo(() => false, [])

  const btnMessage = useMemo(() => {
    return 'Add to cart'
  }, [])

  function onClick() {
    console.log('!@3')
  }

  const renderAddToCart = (
    <Button onClick={onClick} disabled={disabled} className={className}>
      {btnMessage}
    </Button>
  )

  return <>{renderAddToCart}</>
}

export default AddToCartButton
