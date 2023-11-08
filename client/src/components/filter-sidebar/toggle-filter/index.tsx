import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'

type Props = {
  children: React.ReactNode
  title: string
}

import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import AddIcon from '@mui/icons-material/Add'

const ToggleFilter = (props: Props) => {
  const { children, title } = props || {}
  const { localizeMessage } = useIntl()
  const [showToggle, setShowToggle] = React.useState<boolean>(false)

  const toggleSidebar = () => {
    setShowToggle((prevState) => !prevState)
  }

  const ComPIconByToggle = showToggle ? HorizontalRuleIcon : AddIcon

  const renderHeader = (
    <div onClick={toggleSidebar} className={styles.header}>
      <span>{localizeMessage(title)}</span>
      <div className={styles.icon}>
        <ComPIconByToggle />
      </div>
    </div>
  )

  return (
    <div className={styles.toggleFilter}>
      {renderHeader}
      <div className={`${styles.content} ${showToggle ? styles.activeFilter : ''}`}>{children}</div>
    </div>
  )
}

export default ToggleFilter
