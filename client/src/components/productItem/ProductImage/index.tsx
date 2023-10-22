// import Image from '@components/Image'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface PropsTypes {
  className?: string
  url: string | StaticImport
  label: string | undefined
}
const ProductImage = ({ className, url, label }: PropsTypes) => {
  const renderClassName = () => `${styles.imageContainer} ${className ?? ''}`

  return (
    <div className={renderClassName()}>
      <Link href={'/'}>
        <Image
          src={url}
          alt={label || 'image'}
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
