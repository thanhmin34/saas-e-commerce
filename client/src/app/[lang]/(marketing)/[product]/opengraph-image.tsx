import React from 'react'
import { ImageResponse } from 'next/server'
import { getProductDetails } from '@lib/products/useProductDetails'
import styles from './styles.module.scss'
import { get } from 'lodash'
import { IProductDetails } from '@interfaces/product/productDetails'
// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { product: string } }) {
  const responsive: IProductDetails = await getProductDetails({ productSku: params?.product })

  const title = get(responsive, 'product.name', '')
  const image = get(responsive, 'product.image.url', '')
  return new ImageResponse(
    (
      <div className={styles.imagesContainer}>
        {/* Background */}
        <div className={styles.background}>
          <img src={image + '&w=1200&h=630&auto=format&q=75'} alt={title!!} />
          <div className={styles.overlay} />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {/* Tags */}
          <div className={styles.tag}>
            <div>{title}</div>
            <div className={styles.text} />
            {/* <div>{post?.author.full_name}</div> */}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
