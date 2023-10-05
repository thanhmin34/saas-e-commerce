import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'

import { imageUrls } from '@constants/imageUrls'
import styles from './styles.module.scss'

const WishlistButton = ({ children }: { children?: React.ReactNode }) => {
  const isInWishlist = false
  const loading = true

  const iconUrl = useMemo(
    () => (loading ? imageUrls.wishlistLoading : isInWishlist ? imageUrls.wishlistAlreadyIn : imageUrls.wishlist),
    [loading, isInWishlist]
  )

  const removeFromWishlist = () => {}
  const addToWishlist = () => {}

  const handleToggleFavorites = useCallback(async () => {
    try {
      if (isInWishlist) {
        await removeFromWishlist()
        return
      }
      await addToWishlist()
    } catch (e) {
      console.error(e)
    }
  }, [isInWishlist])

  return (
    <div className={`${styles.groupWishlist}`} onClick={handleToggleFavorites}>
      <button className={styles.button} disabled={loading}>
        <Image src={iconUrl} layout="fixed" width={36} height={36} alt={'wishlist icon'} />
      </button>
      {children}
    </div>
  )
}

export default WishlistButton
