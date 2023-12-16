'use client'
import React from 'react'

import HeaderSidebar from './HeaderSidebar'
import styles from './styles.module.scss'
import MegaMenuSidebarBody from './MegaMenuBody'
import SidebarSwitcher from './SidebarSwitcher'
import Languages from '../languages'

export default function MegaMenuSidebar({
  enabledMenu,
  onToggleMenu,
}: {
  enabledMenu: boolean
  onToggleMenu: () => void
}) {
  const activeClass = enabledMenu ? styles.menuSidebarActive : ''

  return (
    <div className={`${styles.menuSidebar} ${activeClass} `}>
      <div className={`${styles.menuContent} ${enabledMenu ? styles.active : ''}`}>
        <HeaderSidebar onToggleMenu={onToggleMenu} />
        <div className={styles.body}>
          <MegaMenuSidebarBody onToggleMenu={onToggleMenu} />
          <SidebarSwitcher onToggleMenu={onToggleMenu} />
        </div>
        <Languages className={styles.language} />
      </div>
      <div className={`${styles.overlay} ${enabledMenu ? styles.activeOverlay : ''}`} onClick={onToggleMenu}></div>
    </div>
  )
}
