import React from 'react'
import { IPropsBanner } from '.'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const BannerItem = ({ item }: { item: IPropsBanner }) => {
  const content = (
    <Link className={styles.bannerItem} href={item?.link}>
      <div className={styles.image}>
        <img alt={item.alt} src={item.src} />
      </div>
      <span>{item?.label || ''}</span>
    </Link>
  )
  return content
}

export default BannerItem
