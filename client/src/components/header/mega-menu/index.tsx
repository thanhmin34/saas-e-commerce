import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import CategoryItem from './CategoryItem'

const category = [
  {
    name: 'Home page',
    sub_category: {
      data: [
        {
          name: 'Aó',
        },
        {
          name: 'AóL',
        },
        {
          name: 'Aó',
        },
        {
          name: 'AóL',
        },
        {
          name: 'Aó',
        },
        {
          name: 'AóL',
        },
      ],
      image_url:
        'https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_03_App_AR-min_1696510812371.jpg',
    },
  },
  {
    name: 'Body',
    sub_category: {},
  },
  {
    name: 'Make up',
    sub_category: {},
  },
  {
    name: 'Skin case',
    sub_category: {},
  },
]
const MegaMenu = () => {
  const content: React.JSX.Element = (
    <div className={`${styles.megaMenuList} main-container`}>
      {category.map((item, index) => (
        <Fragment key={index}>
          <CategoryItem item={item} />
        </Fragment>
      ))}
    </div>
  )
  return <div className={`${styles.megaMenu}`}>{content}</div>
}

export default MegaMenu
