import React from 'react'
import styles from './styles.module.scss'
import { IProductsCart } from '@interfaces/redux/cart'
import Link from 'next/link'
import CartItemImageContainer from '../cart-item-image'
import NameAndActionsContainer from '../action-container'
import QuantityContainer from '../quantity'
import PriceBlock from '@components/productItem/PriceBlock'
import SimplePrice from '@components/productItem/PriceBlock/SimplePrice'
type Props = {
  item: IProductsCart
}

const NormalCartItem = (props: Props) => {
  const { item } = props || {}

  const { image, quantity, price, product_id } = item || {}

  return (
    <li className={styles.product}>
      {/* {errorsMessage && <span className={styles.errorMessage}>{errorsMessage}</span>} */}
      <div className={styles.row}>
        <div className={styles.colProductName}>
          <CartItemImageContainer image={image} />
          <NameAndActionsContainer item={item} />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.quantity}>
            <QuantityContainer currentQuantity={quantity} productId={product_id} />
          </div>
        </div>
        <div className={styles.subtotal}>
          <SimplePrice className={styles.priceSubtotal} price={Math.round(price) || 0} />
        </div>
      </div>
    </li>
  )
}

export default NormalCartItem
