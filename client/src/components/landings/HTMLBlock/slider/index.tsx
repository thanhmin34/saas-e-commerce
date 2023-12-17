import { map } from 'lodash'
import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ROUTER_PATHS } from '@constants/routerPaths'

interface ISliderItem {
  src: string
  link: string
  alt: string
  label: string
}

const SliderBlock = (props: { images: ISliderItem[] }) => {
  const { images } = props
  const renderUi = map(images, (item, index) => (
    <SwiperSlide key={index}>
      <Link href={`${ROUTER_PATHS.CATEGORY}/${item?.link}`} key={index} className={styles.sliderItem}>
        <img src={item.src} alt={item.alt} />
      </Link>
    </SwiperSlide>
  ))

  return (
    <div className={styles.slider}>
      <Swiper spaceBetween={50} slidesPerView={1}>
        {renderUi}
      </Swiper>
    </div>
  )
}

export default SliderBlock
