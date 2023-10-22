import React from 'react'
import styles from './styles.module.scss'
import { SubCategory } from '@interfaces/sub-category'
import SubCategoryList from './SubCategoryList'
import ImageSubCategory from './ImageSubCategory'

type PropsType = { className: string | undefined; sub_category: SubCategory }

const SubCategory = ({ className, sub_category }: PropsType) => {
  const { image_url, data } = sub_category
  return (
    <div className={`${className ? className : ''} ${styles.subCategoryItem}`}>
      <div className={`main-container ${styles.subCategoryBlock}`}>
        <SubCategoryList data={data} />
        <ImageSubCategory image_url={image_url} />
      </div>
    </div>
  )
}

export default SubCategory
