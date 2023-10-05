'use client'
import styles from './styles.module.scss'

const ProductName = ({ productName }: { productName: String | undefined }) => {
  return (
    <div>
      {/* <Link href={productLink}>
        <a className={className}> */}
      <p className={styles.name}>{productName}</p>
      {/* </a>
      </Link> */}
    </div>
  )
}

export default ProductName
