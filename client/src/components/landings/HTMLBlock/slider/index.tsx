import { map } from 'lodash'
import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const sliderData = [
  {
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_01_Desktop_EN-min_1696228503435.jpg',
    alt: 'img',
    href: '/product/1',
  },
  {
    alt: 'img',
    href: '/',
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_02_Desktop_EN-min_1696228529234.jpg',
  },
  {
    alt: 'img',
    href: '/',
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_03_Desktop_EN-min_1696510563175.jpg',
  },
]
const SliderBlock = (props: any) => {
  const renderUi = map(sliderData, (item, index) => (
    <Link href={item.href} key={index} className={styles.sliderItem}>
      <img src={item.url} alt={item.alt} width={'100'} height={100} />
    </Link>
  ))
  return (
    <div className={styles.slider}>
      <Splide aria-label="My Favorite Images">
        <SplideSlide>
          <img
            src="https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_03_Desktop_EN-min_1696510563175.jpg"
            alt="Image 1"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_02_Desktop_EN-min_1696228529234.jpg"
            alt="Image 2"
          />
        </SplideSlide>
      </Splide>
    </div>
  )
}

export default SliderBlock
