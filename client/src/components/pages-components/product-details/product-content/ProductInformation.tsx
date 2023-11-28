'use client'
import React, { Fragment, useCallback, useState } from 'react'
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
import {
  WhatsApp as WhatsAppIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material'
import Button from '@components/button'
import Link from 'next/link'
import { SHARE_SOCIAL } from '@constants/variables'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'
import { IProductItemProps } from '@interfaces/product/productDetails'
import { REGEX_CHECK_INPUT_TYPE_INTEGER } from '@constants/regex'
import useUpdateCart from '@lib/products/useUpdateCart'
import Loading from '@components/loading'

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

  const [quantityCount, setQuantityCount] = useState<number>(1)
  const { handleAddToCart, isLoading } = useUpdateCart()

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

  const handleAddToCartPress = () => {
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
  }

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
  }, [out_of_stock])

  const isWishList = false

  const renderWishlistButton = useCallback(() => {
    return (
      <button
        // disabled={loading}
        className={styles.wishlistFour}
        // onClick={handleToggleFavorites}
      >
        {isWishList ? <FavoriteIcon color={'inherit'} width={25} /> : <FavoriteBorderIcon color="inherit" width={25} />}
      </button>
    )
  }, [])

  const renderAction = () => {
    return (
      <div className={styles.buttonWrapper}>
        {renderQuantityContent()}
        {renderBtnAddToCart()}
        {renderWishlistButton()}
      </div>
    )
  }

  const renderShareSocialContent = () => {
    return SHARE_SOCIAL.map((item, index) => {
      const { enable, id_share_social, link } = item || {}
      const key = `share-social-${index}-${id_share_social}`
      if (enable) {
        type SocialMediaList = {
          [key in string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
            muiName: string
          }
        }

        const socialData: SocialMediaList = {
          facebook: FacebookIcon,
          instagram: InstagramIcon,
          twitter: TwitterIcon,
          whatApp: WhatsAppIcon,
          linkedIn: LinkedInIcon,
        }

        if (id_share_social && socialData[id_share_social]) {
          const Icon = socialData[id_share_social] || <Fragment />
          return (
            <Link href={link} key={key}>
              <Icon width={16} />
            </Link>
          )
        }

        return <Fragment />
      }
    })
  }

  const renderInfoContent = () => {
    const skuTitle = localizeMessage('Product code:')
    const stockStatus = localizeMessage(!!out_of_stock ? 'Unavailable' : 'Available')

    return (
      <div className={styles.otherInfo}>
        <div className={styles.sku}>
          <span className={styles.title}>{skuTitle}</span>
          <span className={styles.value}>{sku}</span>
          <span className={styles.status}>{stockStatus}</span>
        </div>
        <div className={styles.share}>
          <span className={`${styles.heavy}`}>{localizeMessage('Share:')}</span>
          <div className={styles.value}>
            <ul className={styles.socialIcons}>{renderShareSocialContent()}</ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      {renderTopContent()}
      {renderPrice()}
      {renderDescription()}
      {renderAction()}
      {renderInfoContent()}
      {isLoading && <Loading />}
    </Fragment>
  )
}

export default ProductInformation
