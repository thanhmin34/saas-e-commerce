// import Image from '@components/Image'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

const ProductImage = ({ className, url, label }) => {
  const renderClassName = () => `${styles.imageContainer} ${className ?? ''}`

  return (
    <div className={renderClassName()}>
      <Link href={'/'}>
        <Image
          src={url}
          alt={label}
          layout="fill"
          // placeholder="blur"
          // blurDataURL={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
          // quality={100}
        />
      </Link>
    </div>
  )
}

export default ProductImage
