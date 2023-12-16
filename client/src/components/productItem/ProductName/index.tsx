'use client'
import styles from './styles.module.scss'

const ProductName = ({ productName }: { productName: String | undefined }) => {
  return <div className={styles.name}>{productName}</div>
}

export default ProductName
