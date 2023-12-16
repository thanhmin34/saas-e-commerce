'use client'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close'

const HeaderSidebar = ({ onToggleMenu }: { onToggleMenu: () => void }) => {
  const { localizeMessage } = useIntl()
  return (
    <div className={styles.headerSideBar}>
      <div onClick={onToggleMenu} className={styles.iconClose}>
        <CloseIcon width={24} />
      </div>
      <h1>{localizeMessage('Natural Touch')}</h1>
    </div>
  )
}

export default HeaderSidebar
