'use client'

import { imageUrls } from '@constants/imageUrls'
import { ICategoryItem } from '@interfaces/redux/megaMenu'
import { RootState } from '@redux/reducers'
import { cloneDeep, filter, find, map } from 'lodash'
import get from 'lodash/get'
import Image from 'next/legacy/image'

import React, { Fragment, useCallback, useId, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import { DEFAULT_PADDING_CHILD_CATEGORY } from '@constants/category'
import { ROUTER_PATHS } from '@constants/routerPaths'

interface IPropsSideBarBody {
  onToggleMenu: () => void
}
const MegaMenuSidebarBody = ({ onToggleMenu }: IPropsSideBarBody) => {
  const megaMenuList = useSelector((state: RootState) => state.megaMenu)
  const [selectedItem, setSelectedItem] = useState<number[]>([])
  const router = useRouter()
  const __id = useId()

  const onChangeSelectItem = (id: number) => {
    setSelectedItem((prevData) => {
      const newData = cloneDeep(prevData)
      const inValidItem = find(newData, (item) => item === id)
      if (inValidItem) {
        return filter(newData, (item, index) => item !== id)
      }
      return [...newData, id]
    })
  }

  const handleItemClick = useCallback(
    (item: ICategoryItem) => {
      onToggleMenu()
      router.push(`${ROUTER_PATHS.CATEGORY}/${item?.slug}`)
    },
    [onToggleMenu]
  )

  const renderMenuItem = (item: ICategoryItem, index: number, padding: number) => {
    if (!item) return <Fragment />
    const isChildren = get(item, 'children_category[0]')
    const isShowChild = find(selectedItem, (select) => select === item.id)

    const childrenCategoryIcon = isChildren && (
      <button className={`${styles.button} ${isShowChild ? styles.active : ''}`} aria-label="toggle-icon-right">
        <Image
          src={imageUrls.dropdown}
          onClick={() => {
            onChangeSelectItem(item?.id)
          }}
          width={24}
          height={24}
          alt="icon-right-arrow"
          priority
        />
      </button>
    )

    const childrenCategory = (
      <div className={`${styles.childrenBody} ${isChildren && isShowChild ? styles.activeChild : ''} `}>
        {map(item.children_category, (item, index) =>
          renderMenuItem(item, index, padding + DEFAULT_PADDING_CHILD_CATEGORY)
        )}
      </div>
    )

    const title = (
      <button
        className={styles.title}
        onClick={() => {
          handleItemClick(item)
        }}
      >
        {item?.name}
      </button>
    )

    return (
      <Fragment key={`${__id}${item?.id}_${index}`}>
        <div className={`${styles.itemContainer}`} style={{ padding: padding }} key={index}>
          {title}
          {childrenCategoryIcon}
        </div>
        {childrenCategory}
      </Fragment>
    )
  }

  return <div className={styles.megaMenuBody}>{map(megaMenuList, (item, index) => renderMenuItem(item, index, 0))}</div>
}

export default MegaMenuSidebarBody
