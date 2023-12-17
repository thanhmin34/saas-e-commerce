import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import Image from 'next/legacy/image'

const ImageSubCategory = ({ imageData }: { imageData: { image: string; alt: string } }) => {
  const { image, alt } = imageData || {}
  if (!imageData) {
    return <Fragment />
  }
  const imageUrl = image as string

  const renderImage = !!imageUrl ? <Image src={imageUrl} alt={alt} width={200} height={200} priority /> : <Fragment />

  return <div className={styles.imageCategory}>{renderImage}</div>
}

export default ImageSubCategory
