import React from 'react'
import styles from './styles.module.scss'

import SubCategoryList from './SubCategoryList'
import ImageSubCategory from './ImageSubCategory'
import { ISubCategory } from '@interfaces/category'
import { IImage } from '@interfaces/product/productDetails'

type PropsType = {
  className: string | undefined
  sub_category: ISubCategory[]
  imageData: {
    image: string
    alt: string
  }
}

const SubCategory = ({ className, sub_category, imageData }: PropsType) => {
  return (
    <div className={`${className ? className : ''} ${styles.subCategoryItem}`}>
      <div className={`main-container ${styles.subCategoryBlock}`}>
        <SubCategoryList sub_category={sub_category} />

        {!!imageData && <ImageSubCategory imageData={imageData} />}
      </div>
    </div>
  )
}

export default SubCategory
