import React from 'react'
//helper
//styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
// constants
const titleRow = ['Order', 'Date', 'Order Total', 'Status', 'Actions', ""]

const HeaderTable = () => {
  const { localizeMessage } = useIntl()
  return (
    <thead className={styles.headerTable}>
      <tr>
        {titleRow.map((item, index) => (
          <th key={index}>{localizeMessage(item)}</th>
        ))}
      </tr>
    </thead>
  )
}

export default HeaderTable
