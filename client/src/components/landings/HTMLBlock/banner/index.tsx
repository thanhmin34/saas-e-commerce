import React from 'react'
import styles from './styles.module.scss'
import { map } from 'lodash'
import Link from 'next/link'
type Props = {}

const bannersData = [
  {
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Category_Banner_-_home_-_EN-min_1696143670665.jpg',
    alt: 'img',
    href: '/product/1',
  },
  {
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Category_Banner_-_skin_-_EN-min_1696143678876.jpg',
    alt: 'img',
    href: '/product/1',
  },
  {
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Category_Banner_-_relax_-_EN-min_1696143685539.jpg',
    alt: 'img',
    href: '/product/1',
  },
  {
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Category_Banner_-_ranges_-_EN-min_1696143690397.jpg',
    alt: 'img',
    href: '/product/1',
  },
  {
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Category_Banner_-_gifts_-_EN-min_1696143699663.jpg',
    alt: 'img',
    href: '/product/1',
  },
  {
    url: 'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Category_Banner_-_hair_-_EN-min_1696143694834.jpg',
    alt: 'img',
    href: '/product/1',
  },
]

const Banner = (props: Props) => {
  const renderBanners = map(bannersData, (item, index) => (
    <Link href={item.href} key={index} className={styles.bannerItem}>
      <img src={item.url} alt="" />
    </Link>
  ))
  return <div className={styles.banner}>{renderBanners}</div>
}

export default Banner
