'use client'
import React, { useMemo } from 'react'
import styles from './styles.module.scss'
import SubCategory from './SubCategory'
import { Category } from '@interfaces/category'
import lodash from 'lodash'
import Link from 'next/link'
import { ROUTER_PATHS } from '@constants/routerPaths'
import { ICategoryItem } from '@interfaces/redux/megaMenu'
const CategoryItem = ({ item }: { item: ICategoryItem }) => {
  const { name, children_category, image, slug } = item || {}

  const classNames = useMemo(() => {
    if (!lodash.isEmpty(children_category)) {
      return `${styles.menuName} ${styles.menuHover}`
    }
    return styles.menuName
  }, [children_category])

  return (
    <div className={styles.menuItem}>
      <Link href={`${ROUTER_PATHS.CATEGORY}/${slug}`} className={classNames}>
        <span className={styles.text}>{name}</span>
      </Link>
      <SubCategory className={styles.subCategory} sub_category={children_category} imageData={image} />
    </div>
  )
}

export default CategoryItem
