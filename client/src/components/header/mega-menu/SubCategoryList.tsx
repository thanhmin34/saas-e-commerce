import React from 'react'
import lodash from 'lodash'
import styles from './styles.module.scss'
import { SubCategoryItem } from '@interfaces/sub-category'
const SubCategoryList = ({ data }: { data: SubCategoryItem[] | undefined }) => {
  const renderUi = lodash.map(data, (item, index) => (
    <div className={styles.item} key={index}>
      <span>{item.name}</span>
    </div>
  ))
  return <div className={`${styles.subCategoryListItem}`}>{renderUi}</div>
}

export default SubCategoryList
