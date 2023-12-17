import React from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'

import styles from './styles.module.scss'
import { IBannerItem } from '@interfaces/home'
import { ROUTER_PATHS } from '@constants/routerPaths'

const BannerItem = ({ item }: { item: IBannerItem }) => {
  const { slug, name = '', image } = item || {}

  const content = (
    <Link className={styles.bannerItem} href={`${ROUTER_PATHS.CATEGORY}/${slug}`}>
      <div className={styles.image}>
        {image?.image && <Image alt={image?.alt} src={image?.image} width={160} height={160} priority />}
      </div>
      <span>{name}</span>
    </Link>
  )
  return content
}

export default BannerItem
