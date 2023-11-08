import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'

export default function SummaryContainer() {
  const { localizeMessage, formatMessage } = useIntl()
  const { total_quantity } = useSelector((state: RootState) => state.cartData)
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.title}>{localizeMessage('Summary')}</h2>
      <span className={styles.count}>{formatMessage({ id: '{value} items' }, { value: total_quantity || 0 })}</span>
    </div>
  )
}
