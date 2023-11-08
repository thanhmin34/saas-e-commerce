'use client'
import Link from 'next/link'
import React, { useMemo } from 'react'

import styles from './styles.module.scss'
import Image from 'next/image'
import { DEVICE } from '@constants/device'
import useDetectDevice from '@hooks/useDetectDevice'

// const data = {
//   banner_cart_left_desktop: {
//     url: 'https://media.9ten.cloud/media/snaptec/pwa/stores/15/Cart-Banner-Half-Shea-Butter-EN-min_1.png',
//     alt: 'image',
//     link: '/',
//   },
//   banner_cart_right_desktop: {
//     url: 'https://media.9ten.cloud/media/snaptec/pwa/stores/15/Cart-Banner-Free-Shipping-EN-min_1.png',
//     alt: 'image',
//     link: '/',
//   },
//   banner_cart_mobile: {
//     url: 'https://media.9ten.cloud/media/snaptec/pwa/stores/15/Cart-Banner-Half-Shea-Butter-EN-min_1.png',
//     alt: 'image',
//     link: '/',
//   },
// }
export default function CartBanner() {
  const { device } = useDetectDevice()

  const renderBannerItem = ({ link, src, alt }: { link: string; alt: string; src: string }) => {
    return (
      <Link href={link}>
        <div className={styles.imageContainer}>
          <Image className="img-fluid w-100" src={src} alt={alt} layout="fill" />
        </div>
      </Link>
    )
  }

  function renderDynamicCartBanner() {
    return (
      <>
        <div className={true ? styles.cartBanner : styles.noCartBanner}>
          {device === DEVICE.DESKTOP ? (
            <>
              {renderBannerItem({
                link: '/',
                src: 'https://media.9ten.cloud/media/snaptec/pwa/stores/15/Cart-Banner-Half-Shea-Butter-EN-min_1.png',
                alt: 'cart-banner',
              })}
              {renderBannerItem({
                link: '/',
                src: 'https://media.9ten.cloud/media/snaptec/pwa/stores/15/Cart-Banner-Free-Shipping-EN-min_1.png',
                alt: 'cart-banner',
              })}
            </>
          ) : (
            <div className={true ? styles.cartBannerTablet : styles.CartBannerCheckTablet}>
              {renderBannerItem({
                link: '/',
                src: 'https://media.9ten.cloud/media/snaptec/pwa/stores/15/Cart-Banner-Half-Shea-Butter-EN-min_1.png',
                alt: 'cart-banner',
              })}
            </div>
          )}
        </div>
      </>
    )
  }

  return <>{renderDynamicCartBanner()}</>
}
