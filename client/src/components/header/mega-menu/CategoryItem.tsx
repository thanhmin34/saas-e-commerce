'use client'
import React, { useMemo } from 'react'
import styles from './styles.module.scss'
import SubCategory from './SubCategory'
import { Category } from '@interfaces/sub-category'
import lodash from 'lodash'

const CategoryItem = ({ item }: { item: Category }) => {
  const { name, sub_category } = item || {}

  const classNames = useMemo(() => {
    const { data } = sub_category || {}
    if (!lodash.isEmpty(data)) {
      return `${styles.menuName} ${styles.menuHover}`
    }
    return styles.menuName
  }, [sub_category])

  return (
    <div className={styles.menuItem}>
      <div className={classNames}>
        <span className={styles.text}>{name}</span>
      </div>
      <SubCategory className={styles.subCategory} sub_category={sub_category} />
    </div>
  )
}

export default CategoryItem
