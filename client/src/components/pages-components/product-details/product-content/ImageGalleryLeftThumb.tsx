'use client'
import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import Image from 'next/legacy/image'
import { IImage, IMediaGallery } from '@interfaces/product/productDetails'
import { isEmpty, map } from 'lodash'

type Props = {
  image: IImage
  mediaGallery: IMediaGallery[]
}

const ImageGalleryLeftThumb = (props: Props) => {
  const { image, mediaGallery = [] } = props || {}

  const renderThumbnail = () => {
    const { url, label } = image || {}
    if (!url) return <Fragment />
    return (
      <div className={styles.thumbnail}>
        <Image src={url} alt={label} layout="fill" priority={true} />
      </div>
    )
  }

  const renderSlickImage = () => {
    if (isEmpty(mediaGallery)) return <Fragment />

    return (
      <div className={styles.slickImage}>
        {map(mediaGallery, (item, index) => {
          const { url, label, position } = item || {}
          if (!url) return <Fragment />
          return (
            <div className={styles.imageItem} key={`${index}_${position}`}>
              <Image src={url} alt={label || 'image'} layout="fill" priority={true} />
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div className={styles.imageGallery}>
      {renderThumbnail()}
      {renderSlickImage()}
    </div>
  )
}

export default ImageGalleryLeftThumb
