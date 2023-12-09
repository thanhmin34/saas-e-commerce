import React, { Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { RootState } from '@redux/reducers'
import useIntl from '@hooks/useIntl'
import { DEVICE } from '@constants/device'
import { SPACE_SYMBOL } from '@constants/symbol'
import AddIcon from '@mui/icons-material/Add'
import useDetectDevice from '@hooks/useDetectDevice'
import { IAddProductInWishListParams } from '@interfaces/wishlist'
import { map } from 'lodash'
import ProductItem from '@components/productItem'
import useUpdateCart from '@lib/products/useUpdateCart'
import Loading from '@components/loading'
import useCart from '@lib/cart/useCartDetails'

interface IProps {
  onAddProductInWishlist: (params: IAddProductInWishListParams) => void
  onDeleteProductWishlist: (id: number) => void
}

const MyWishlist = (props: IProps) => {
  const { device } = useDetectDevice()
  const { localizeMessage } = useIntl()
  const { wishlist } = useSelector((state: RootState) => state.wishlistData)
  const { refetchCart } = useCart()
  const { handleAddToCart, isLoading } = useUpdateCart()

  const handleAddAllToCart = useCallback(async () => {
    if (wishlist?.length <= 0) return
    const isDisabledModal = true
    const newWishlist = map(wishlist, (item) => {
      const results = handleAddToCart(
        {
          product: {
            id: item.id,
            quantity: 1,
            sku: item.sku,
          },
        },
        isDisabledModal
      )
      return () => results
    })
    // await Promise.all(newWishlist.map((i) => i()))
    // refetchCart()
  }, [wishlist])

  const renderAction = () => {
    return (
      <div className={`${styles.action} ${styles.myWishListTitle}`}>
        <div className={styles.myWishListCount}>
          {device === DEVICE.DESKTOP && <h1>{localizeMessage('MY WISHLIST')}</h1>}
          <span>
            {wishlist?.length || 0}
            {SPACE_SYMBOL}
            {localizeMessage('Items')}
          </span>
        </div>
        {device === DEVICE.DESKTOP && (
          <div className={styles.wishlistButton}>
            <div className={styles.addToCart} onClick={handleAddAllToCart}>
              <AddIcon width={24} />
              {localizeMessage('Add All to Cart')}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className={styles.content}>
        {map(wishlist, (item) => {
          return <ProductItem key={item.id} item={item} />
        })}
      </div>
    )
  }

  let viewUI: React.JSX.Element = <Fragment />

  if (wishlist?.length === 0) {
    viewUI = (
      <span className={styles.noItems}>{localizeMessage("You don't have any products in your wish list yet.")}</span>
    )
  } else {
    viewUI = (
      <div className={styles.body}>
        {renderAction()}
        {renderContent()}
        {device === DEVICE.MOBILE && (
          <div className={styles.wishlistButtonMobile}>
            <span className={styles.addToCartMobile} onClick={handleAddAllToCart}>
              {localizeMessage('Add All to Cart')}
            </span>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={styles.myWishlist}>
      {viewUI}
      {isLoading && <Loading />}
    </div>
  )
}

export default MyWishlist
