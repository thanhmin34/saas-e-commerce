'use client'
import React from 'react'
import styles from './styles.module.scss'
import MenuMobile from '../menu-mobile'
import SearchMobile from '../search-mobile'

const MobileActions = () => {
  return (
    <div className={styles.mobileActions}>
      <MenuMobile />
      <SearchMobile />
    </div>
  )
}

export default MobileActions
