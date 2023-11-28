'use client'
import Image from 'next/legacy/image'
import { useSelector } from 'react-redux'
import React, { Fragment, useMemo } from 'react'
import { RootState } from '@redux/reducers'
import styles from './styles.module.scss'

const CheckoutBanner = () => {
  const {
    banner_checkout_left,
    banner_checkout_right,
    prefix_url_media = '',
    url_media_backend,
  } = useSelector((state: RootState) => state.configApp)

  const checkBanner = useMemo(() => {
    return banner_checkout_left && banner_checkout_right && url_media_backend
  }, [banner_checkout_left, banner_checkout_right])

  const bannerCheckouts = useMemo(() => {
    const bannerLeftUrl = `${url_media_backend}${prefix_url_media}${banner_checkout_left}`
    const bannerRightUrl = `${url_media_backend}${prefix_url_media}${banner_checkout_right}`
    return [
      {
        id: 1,
        alt: 'banner checkout 1',
        image: bannerLeftUrl,
      },
      {
        id: 2,
        alt: 'banner checkout 2',
        image: bannerRightUrl,
      },
    ]
  }, [banner_checkout_left, banner_checkout_right, prefix_url_media, url_media_backend])

  if (!checkBanner) return <Fragment />
  return (
    <div className={styles.banner}>
      {bannerCheckouts.map((item) => (
        <div key={item.id} className={styles.imageItem}>
          {!!item.image && <Image layout="fill" src={item.image} alt={item.alt} priority={true} />}
        </div>
      ))}
    </div>
  )
}

export default CheckoutBanner
