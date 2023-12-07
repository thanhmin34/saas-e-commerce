'use client'
import React, { useCallback, useMemo } from 'react'
import Image from 'next/legacy/image'

import { imageUrls } from '@constants/imageUrls'
import styles from './styles.module.scss'
import useWishlist from '@lib/account-information/useWishlist'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import useIntl from '@hooks/useIntl'
import useToastMessage from '@hooks/useToastMessage'
import { find, isEmpty } from 'lodash'

const WishlistButton = ({ children, productId }: { children?: React.ReactNode; productId: number }) => {
  const { localizeMessage } = useIntl()
  const { showToast, typeToast } = useToastMessage()
  const { isLoading, onAddProductInWishlist, onDeleteProductWishlist } = useWishlist({ enabled: false })
  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)
  const { wishlist } = useSelector((state: RootState) => state.wishlistData)

  const isInWishlist = useMemo(() => {
    if (isSignedIn && !isEmpty(wishlist)) {
      const index = find(wishlist, (item) => item.id === productId)
      return !!index
    }
    return false
  }, [isSignedIn, wishlist, productId])

  const iconUrl = useMemo(
    () => (isLoading ? imageUrls.wishlistLoading : isInWishlist ? imageUrls.wishlistAlreadyIn : imageUrls.wishlist),
    [isLoading, isInWishlist]
  )

  const onToggleFavorites = useCallback(async () => {
    if (!isSignedIn) {
      showToast(localizeMessage('Please login first'), typeToast.error)
      return
    }
    if (isInWishlist) {
      onDeleteProductWishlist(productId)
      return
    }
    onAddProductInWishlist({
      product_id: productId,
    })
  }, [isInWishlist, isSignedIn])

  return (
    <div className={`${styles.groupWishlist}`}>
      <button className={styles.button} disabled={isLoading} onClick={onToggleFavorites}>
        <Image src={iconUrl} layout="fixed" width={36} height={36} alt={'wishlist icon'} />
      </button>
      {children}
    </div>
  )
}

export default WishlistButton
