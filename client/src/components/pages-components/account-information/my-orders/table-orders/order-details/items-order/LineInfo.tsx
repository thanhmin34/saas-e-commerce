'use client'
import { IAddressInfo } from '@interfaces/user'
import styles from './styles.module.scss'

const LineInfo = ({ item }: { item: IAddressInfo }) => {
  const { icon, title, value } = item || {}
  return (
    <div className={`${styles.rowView} `}>
      <div className={styles.iconView}>
        <div className={styles.iconLine}>{icon}</div>
        <span className={styles.textLine}>{title}</span>
      </div>
      <span className={styles.textLine}>{value}</span>
    </div>
  )
}

export default LineInfo
