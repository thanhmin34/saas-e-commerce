import Link from 'next/link'
import React from 'react'

import Image from 'next/image'
import styles from './styles.module.scss'

export default function CartItemImageContainer({
  image,
}: {
  image: {
    url: string
    label: string
  }
}) {
  const { url, label } = image || {}

  let images = <Image src={url} width={100} height={100} alt={label} />

  //   if (size === SIZE_IMAGE.SMALL) images = <Image src={productImg} width={60} height={70} alt={productName} />

  return (
    <Link href={'/'}>
      <span className={styles.productImageContainer}>{images}</span>
    </Link>
  )
}
