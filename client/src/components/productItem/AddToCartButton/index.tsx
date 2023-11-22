'use client'
import Button from '@components/button'
import styles from './styles.module.scss'
import { ProductItemInterface } from '@interfaces/product'
import useUpdateCart from '@lib/products/useUpdateCart'

const AddToCartButton = ({
  className,
  isOutOfStock,
  item,
}: {
  className: string
  isOutOfStock: boolean
  item: ProductItemInterface
}) => {
  const { handleAddToCart } = useUpdateCart()

  function onClick() {
    const { id, sku, image, price, special_price, name } = item || {}

    handleAddToCart &&
      handleAddToCart({
        product: {
          id,
          sku,
          image,
          price,
          quantity: 1,
          special_price,
          name,
        },
      })
  }

  const renderAddToCart = (
    <Button onClick={onClick} disabled={isOutOfStock} className={className}>
      {isOutOfStock ? 'Out Of Stock' : 'Add to cart'}
    </Button>
  )

  return <>{renderAddToCart}</>
}

export default AddToCartButton
