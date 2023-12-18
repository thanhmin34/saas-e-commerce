'use client'
import React, { Fragment, useId } from 'react'
import styles from './styles.module.scss'
import { map } from 'lodash'
import ProductItem from '@components/productItem'
import { ProductItemInterface } from '@interfaces/product'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/legacy/image'
import { BREAK_POINTS_PRODUCTS_SLIDER } from '@constants/home'
import useIntl from '@hooks/useIntl'

interface IProductSliders {
  products: ProductItemInterface[] | []
  position: number
  banner: string
  title: string
}

const ProductSliders = ({ item }: { item: IProductSliders }) => {
  const { products, position, banner, title = '' } = item || {}
  const { localizeMessage } = useIntl()
  const _id = useId()

  const renderUi = map(products, (item: ProductItemInterface, index) => (
    <Fragment key={`${_id}_${position}_${item?.sku}`}>
      <SwiperSlide>
        <ProductItem item={item} />
      </SwiperSlide>
    </Fragment>
  ))

  const renderProducts = (
    <div className={`${styles.productsList} ${!!banner ? styles.isBanner : ''}`}>
      <Swiper
        className={`${!!banner ? styles.swiper : ''}`}
        spaceBetween={50}
        slidesPerView={!banner ? 4 : 3}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={BREAK_POINTS_PRODUCTS_SLIDER}
      >
        {renderUi}
      </Swiper>
    </div>
  )
  const renderBanner = (
    <div className={`${styles.banner}`}>
      <Image src={banner} alt="banner" layout="fill" priority />
    </div>
  )

  return (
    <div className={styles.productsSlider}>
      <div className={styles.titleAction}>
        <h1>{localizeMessage(title)}</h1>
      </div>
      <div className={styles.content}>
        {/* {!!banner && renderBanner} */}
        {renderProducts}
      </div>
    </div>
  )
}

export default ProductSliders
