import React from 'react'

type Props = {
  image_url: string | undefined
}
type ImageUrl = string | StaticImport

import styles from './styles.module.scss'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const ImageSubCategory = ({ image_url }: Props) => {
  const imageUrl = image_url as ImageUrl
  const renderImage = imageUrl && <Image src={imageUrl} alt="t" width={200} height={200} />

  return <div className={styles.imageCategory}>{renderImage}</div>
}

export default ImageSubCategory
