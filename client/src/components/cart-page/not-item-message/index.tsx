import useIntl from '@hooks/useIntl'
import React from 'react'
import styles from './styles.module.scss'
const NoItemMessage = () => {
  const { localizeMessage } = useIntl()
  return <h3 className={styles.noItemsMessage}>{localizeMessage('There are no items in your cart.')}</h3>
}

export default NoItemMessage
