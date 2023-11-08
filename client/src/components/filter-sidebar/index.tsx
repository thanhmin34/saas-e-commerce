import React from 'react'
import styles from './styles.module.scss'
import useDetectDevice from '@hooks/useDetectDevice'

export default function FilterSidebar() {
  const { device } = useDetectDevice()

  return <div className={styles.filterSidebar}>filterSidebar</div>
}
