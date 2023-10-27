'use client'
import React from 'react'
import styles from './styles.module.scss'
import TopBar from './topbar'
import MainHeader from './main-header'
import MegaMenu from './mega-menu'
import useMegaMenu from '@lib/category/useMegaMenu'
import { CACHE_TIME } from '@constants/constants'
const Header = () => {
  useMegaMenu({ cacheTime: CACHE_TIME })

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
