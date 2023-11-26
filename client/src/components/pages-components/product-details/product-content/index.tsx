'use client'
import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import ImageGalleryLeftThumb from './ImageGalleryLeftThumb'
import ProductInformation from './ProductInformation'
import ProductDescriptionTab from './ProductDescriptionTab'
import { IProductItemProps } from '@interfaces/product/productDetails'
import TamaraWidgetButton from './TamaraWidgetButton'
import TabbyWidgetButton from './TabbyWidgetButton'

const ProductContent = (props: IProductItemProps) => {
  const { product } = props || {}
  const { id, image, media_gallery, special_price, price, description_short } = product || {}

  return (
    <Fragment>
      <div className={styles.productContent}>
        <ImageGalleryLeftThumb image={image} mediaGallery={media_gallery} />
        <div>
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
