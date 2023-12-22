import Link from 'next/link'
import React, { useMemo } from 'react'

import Image from 'next/image'
import styles from './styles.module.scss'
import useDetectDevice from '@hooks/useDetectDevice'
import { DEVICE } from '@constants/device'

interface IPropsImage {
  image: {
    url: string
    label: string
  }
}
export default function CartItemImageContainer({ image }: IPropsImage) {
  const { url, label } = image || {}
  const { device } = useDetectDevice()

  const stylesImage = useMemo(() => {
    let style = {
      width: 100,
      height: 100,
    }
    if (device === DEVICE.MOBILE) {
      style = {
        width: 70,
        height: 60,
      }
    }
    return style
  }, [device])

  const images = <Image src={url} {...stylesImage} alt={label} priority />

  return (
    <Link href={'/'}>
      <span className={styles.productImageContainer}>{images}</span>
    </Link>
  )
}
