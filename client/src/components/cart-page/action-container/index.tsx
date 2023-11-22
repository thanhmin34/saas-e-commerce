import useIntl from '@hooks/useIntl'
import get from 'lodash/get'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.scss'
import { IProductsCart } from '@interfaces/redux/cart'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useUpdateCart from '@lib/products/useUpdateCart'

const NameAndActionsContainer = ({ item }: { item: IProductsCart }) => {
  const { localizeMessage } = useIntl()

  const { handleRemoveToCart } = useUpdateCart()

  const renderButton = (
    <div className={styles.buttonContainer}>
      <button
        className={styles.productButton}
        onClick={() => {
          handleRemoveToCart({ product_id: item?.product_id })
        }}
      >
        <span className={styles.content}>
          <DeleteIcon />
          <span>{localizeMessage('Remove')}</span>
        </span>
      </button>
      <div className={styles.productButton}>
        <span className={styles.content}>
          <FavoriteBorderIcon />
          <span>{localizeMessage('Add to favorite')}</span>
        </span>
      </div>
    </div>
  )

  return (
    <div className={styles.name}>
      <Link href={'/'}>
        <span className={styles.productName}>{get(item, 'name')}</span>
      </Link>
      {/* <ConfigurableContainer item={item} /> */}
      {renderButton}
    </div>
  )
}

export default NameAndActionsContainer
