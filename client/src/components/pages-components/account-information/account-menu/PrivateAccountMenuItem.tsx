import React from 'react'
import Image from 'next/legacy/image'
import styles from './styles.module.scss'

interface IMenuItem {
  id: string
  icon: string
  title: React.JSX.Element
  widthIcon: number
  heightIcon: number
}

interface IProps {
  selectedTabId: string
  handlePressMenu: (id: string) => void
  item: IMenuItem
}

const PrivateAccountMenuItem = (props: IProps) => {
  const { item, handlePressMenu, selectedTabId } = props || {}
  const { id, icon, title } = item
  const isActive = id === selectedTabId

  return (
    <button
      className={`${styles.menuItem} ${isActive ? styles.menuActive : ''}`}
      onClick={() => handlePressMenu(item.id)}
      // style={{ backgroundColor: isActive ? 'rgb(243, 248, 235)' : '' }}
    >
      <Image
        loading="eager"
        src={icon}
        className={styles.icon}
        alt="icon-account"
        width={item.widthIcon}
        height={item.heightIcon}
        priority
      />
      <div className={styles.title}>{title} </div>
    </button>
  )
}

export default PrivateAccountMenuItem
