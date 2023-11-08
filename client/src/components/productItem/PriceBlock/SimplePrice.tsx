'use client'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { RootState } from '@redux/reducers'

const SimplePrice = ({ price }: { price: number }) => {
  const configApp = useSelector((state: RootState) => state.configApp)
  const { currency } = configApp || {}
  const renderPrice = `${price} ${currency}`

  return <span className={styles.price}>{renderPrice}</span>
}

export default SimplePrice
