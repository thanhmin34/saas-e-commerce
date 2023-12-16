'use client'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import parse from 'html-react-parser'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { SPACE_SYMBOL } from '@constants/symbol'
import ProductRating from '@components/productItem/ProductRatingBlock/ProductRating'
import Price from '@components/productItem/Price'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Button from '@components/button'
import { IProductItemProps } from '@interfaces/product/productDetails'
import { REGEX_CHECK_INPUT_TYPE_INTEGER } from '@constants/regex'
import useUpdateCart from '@lib/products/useUpdateCart'
import Loading from '@components/loading'
import useWishlist from '@lib/account-information/useWishlist'
import { find, isEmpty } from 'lodash'
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import useToastMessage from '@hooks/useToastMessage'
import SubInfoContent from './SubInfoContent'

const ProductInformation = (props: IProductItemProps) => {
  const { localizeMessage } = useIntl()
  const { product } = props || {}
  const {
    id,
    name = '',
    brand = '',
    price = 0,
    special_price,
    description = '',
    out_of_stock,
    sku,
    image,
    total_rating = 0,
    review_count = 0,
  } = product || {}
  const {
    isLoading: isLoadingWishlist,
    onAddProductInWishlist,
    onDeleteProductWishlist,
  } = useWishlist({ enabled: false })
  const { showToast, typeToast } = useToastMessage()
  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)
  const { wishlist } = useSelector((state: RootState) => state.wishlistData)

  const [quantityCount, setQuantityCount] = useState<number>(1)
  const { handleAddToCart, isLoading } = useUpdateCart()

  const isInWishlist = useMemo(() => {
    if (isSignedIn && !isEmpty(wishlist)) {
      const index = find(wishlist, (item) => item.id === id)
      return !!index
    }
    return false
  }, [isSignedIn, wishlist, id])

  const onToggleFavorites = useCallback(async () => {
    if (!isSignedIn) {
      showToast(localizeMessage('Please login first'), typeToast.error)
      return
    }
    if (isInWishlist) {
      onDeleteProductWishlist(id)
      return
    }
    onAddProductInWishlist({
      product_id: id,
    })
  }, [isInWishlist, isSignedIn])

  const handleChangeQty = useCallback(
    (type: string) => {
      setQuantityCount((prev) => {
        if (type !== 'increment') {
          return prev - 1
        }
        return prev + 1
      })
    },
    [quantityCount]
  )

  const handleAddToCartPress = useCallback(() => {
    const params = {
      product: {
        quantity: quantityCount,
        sku,
        id,
        image,
        price,
        special_price,
        name,
      },
    }

    handleAddToCart && handleAddToCart(params)
  }, [quantityCount])

  const renderTopContent = useCallback(() => {
    return (
      <Fragment>
        {brand && <h1 className={styles.brandName}>{brand}</h1>}
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.ratingWrap}>
          <span className={styles.ratingPoint}>{total_rating}/5</span>
          <ProductRating ratingValue={total_rating} />
          <span className={styles.ratingCount}>
            <span>({review_count}</span>
            <span>{SPACE_SYMBOL}</span>
            <span>{localizeMessage('Reviews')})</span>
          </span>
        </div>
      </Fragment>
    )
  }, [name, brand, total_rating])

  const renderPrice = useCallback(() => {
    if (!special_price) {
      return (
        <div className={styles.price}>
          <Price value={price} />
        </div>
      )
    }
    return (
      <div className={styles.price}>
        <Price value={price} className={styles.regularPrice} />
        <span> -</span>
        <Price value={special_price} className={styles.specialPrice} />
      </div>
    )
  }, [price, special_price])

  const renderDescription = useCallback(() => {
    return (
      <div className={styles.description}>
        <div>{description && parse(description)}</div>
      </div>
    )
  }, [description])

  const renderQuantityContent = useCallback(() => {
    return (
      <div className={styles.quantity}>
        <button
          className={styles.icon}
          onClick={() => {
            quantityCount > 1 && handleChangeQty('decrement')
          }}
        >
          <RemoveIcon width={30} />
        </button>
        <input
          value={quantityCount}
          onChange={(e) => {
            const newQuantity = e.target.value.replace(REGEX_CHECK_INPUT_TYPE_INTEGER, '')
            setQuantityCount(Number(newQuantity))
          }}
        />
        <button className={styles.icon} onClick={() => handleChangeQty('increment')}>
          <AddIcon width={30} />
        </button>
      </div>
    )
  }, [quantityCount])

  const renderBtnAddToCart = useCallback(() => {
    const productIsOutStock = !!out_of_stock
    return (
      <>
        {productIsOutStock ? (
          <Button className={styles.ofs} disabled>
            {localizeMessage('Out of stock')}
          </Button>
        ) : (
          <Button className={styles.cart} disabled={isLoading} onClick={handleAddToCartPress}>
            {localizeMessage('Add to Cart')}
          </Button>
        )}
      </>
    )
  }, [out_of_stock, quantityCount])

  const renderWishlistButton = useCallback(() => {
    return (
      <button disabled={isLoadingWishlist || isLoading} className={styles.wishlistFour} onClick={onToggleFavorites}>
        {isInWishlist ? (
          <FavoriteIcon color={'inherit'} width={25} />
        ) : (
          <FavoriteBorderIcon color="inherit" width={25} />
        )}
      </button>
    )
  }, [isInWishlist])

  const renderAction = () => {
    return (
      <div className={styles.buttonWrapper}>
        {renderQuantityContent()}
        {renderBtnAddToCart()}
        {renderWishlistButton()}
      </div>
    )
  }

  return (
    <Fragment>
      {renderTopContent()}
      {renderPrice()}
      {renderDescription()}
      {renderAction()}
      <SubInfoContent outOfStock={!!out_of_stock} sku={sku} />
      {(isLoading || isLoadingWishlist) && <Loading />}
    </Fragment>
  )
}

export default ProductInformation
