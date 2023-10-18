import React from 'react'
import styles from './styles.module.scss'
import TopBar from './topbar'
import MainHeader from './main-header'
import MegaMenu from './mega-menu'

const Header = () => {
  return (
    <header className={styles.header}>
      <TopBar />
      <div className={`${styles.mainHeader} main-container`}>
        <MainHeader />
      </div>
      <MegaMenu />
    </header>
  )
}

export default Header
