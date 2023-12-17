import { map } from 'lodash'
import styles from './styles.module.scss'
import BannerItem from './BannerItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IBannerData } from '@interfaces/home'
import { BREAK_POINTS_BANNER_SLIDER } from '@constants/home'

const Banner = ({ banners }: { banners: IBannerData }) => {
  const content = map(banners, (item, index) => (
    <SwiperSlide key={item?.id}>
      <BannerItem item={item} />
    </SwiperSlide>
  ))

  return (
    <div className={styles.banner}>
      <Swiper
        breakpoints={BREAK_POINTS_BANNER_SLIDER}
        spaceBetween={50}
        slidesPerView={6}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {content}
      </Swiper>
    </div>
  )
}

export default Banner
