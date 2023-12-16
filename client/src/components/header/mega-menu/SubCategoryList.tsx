import React from 'react'
import lodash from 'lodash'
import styles from './styles.module.scss'
import { ISubCategory } from '@interfaces/category'
import Link from 'next/link'
const SubCategoryList = ({ sub_category }: { sub_category: ISubCategory[] | [] }) => {
  const renderUi = lodash.map(sub_category, (item) => (
    <Link href={`${item.slug}`} className={styles.item} key={item.id}>
      <span>{item.name}</span>
    </Link>
  ))
  return <div className={`${styles.subCategoryListItem}`}>{renderUi}</div>
}

export default SubCategoryList
