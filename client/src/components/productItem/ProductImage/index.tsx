// import Image from '@components/Image'
import Image from 'next/legacy/image'
import styles from './styles.module.scss'
import { Fragment } from 'react'

interface PropsTypes {
  className?: string
  url: string | undefined
  label: string | undefined
}
const ProductImage = ({ className, url, label }: PropsTypes) => {
  const renderClassName = () => `${styles.imageContainer} ${className ?? ''}`

  if (!url) return <Fragment />

  return (
    <div className={renderClassName()}>
      <Image
        src={url}
        alt={label || 'image'}
        layout="fill"
        // placeholder="blur"
        // blurDataURL={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
        // quality={100}
      />
    </div>
  )
}

export default ProductImage
