import Link from 'next/link'
import React from 'react'
import useIntl from '@hooks/useIntl'
import { ROUTER_PATHS } from '@constants/routerPaths'
import styles from './styles.module.scss'

const SidebarSwitcher = ({ onToggleMenu }: { onToggleMenu: () => void }) => {
  const { localizeMessage } = useIntl()

  return (
    <div className={styles.switcher}>
      <Link className={styles.switcherItem} href={ROUTER_PATHS.CONTACT_US} onClick={onToggleMenu}>
        <span>{localizeMessage('Contact Us')}</span>
      </Link>
    </div>
  )
}

export default SidebarSwitcher
