'use client'
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import { IProductItemProps } from '@interfaces/product/productDetails'

const ProductInformation = dynamic(() => import('./ProductInformation'), {
  ssr: false,
})

const ProductDescriptionTab = dynamic(() => import('./ProductDescriptionTab'), {
  ssr: false,
})

const ImageGalleryLeftThumb = dynamic(() => import('./ImageGalleryLeftThumb'), {
  ssr: true,
})

const TabbyWidgetButton = dynamic(() => import('./TabbyWidgetButton'), {
  ssr: false,
})

const TamaraWidgetButton = dynamic(() => import('./TamaraWidgetButton'), {
  ssr: false,
})

const ProductContent = (props: IProductItemProps) => {
  const { product } = props || {}
  const { id, image, media_gallery, special_price, price, description_short } = product || {}

  return (
    <Fragment>
      <div className={styles.productContent}>
        <ImageGalleryLeftThumb image={image} mediaGallery={media_gallery} />
        <div className={styles.productInformation}>
          <ProductInformation product={product} />
          <TamaraWidgetButton finalPrice={special_price ? special_price : price} />
          <TabbyWidgetButton finalPrice={special_price ? special_price : price} />
        </div>
      </div>
      <ProductDescriptionTab productId={id} descriptionShort={description_short || ''} />
    </Fragment>
  )
}

export default ProductContent
