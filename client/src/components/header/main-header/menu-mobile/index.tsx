'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import MenuIcon from '@mui/icons-material/Menu'
import MenuSideBar from '@components/header/menu-sidebar'
type Props = {}

const MenuMobile = (props: Props) => {
  const [enabledMenu, setEnabledMenu] = useState(false)

  const onToggleMenu = () => {
    setEnabledMenu((prev) => !prev)
  }
  return (
    <div className={styles.menuMobile}>
      <button onClick={onToggleMenu} className={styles.button}>
        <MenuIcon width={24} />
      </button>
      <MenuSideBar onToggleMenu={onToggleMenu} enabledMenu={enabledMenu} />
    </div>
  )
}

export default MenuMobile
