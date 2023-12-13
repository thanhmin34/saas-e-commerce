import React from 'react'

import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { IOrderItemMobile } from '.'

const Actions = ({ item, onChangeOrder }: IOrderItemMobile) => {
  const { localizeMessage } = useIntl()
  const handleReOrder = () => {}
  const viewOrder = <div onClick={() => onChangeOrder(item)}>{localizeMessage('View Order')}</div>

  const reOrder = <div onClick={() => handleReOrder()}>{localizeMessage('Reorder')}</div>

  return (
    <div className={styles.actions}>
      <span>{localizeMessage('Actions')}</span>
      <div className={styles.button}>
        {viewOrder}
        {reOrder}
      </div>
    </div>
  )
}

export default Actions
