import styles from './styles.module.scss'

type TypeBrandName = string | undefined

const BrandName = ({ brandName }: { brandName: TypeBrandName }) => {
  return (
    <div className={styles.brandName}>
      <span>{brandName}</span>
    </div>
  )
}

export default BrandName
