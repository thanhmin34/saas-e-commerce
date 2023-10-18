import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.scss'
type ActionItemType = {
  link: string
  icon: string
  title: string
}

const ActionItem = ({ item }: { item: ActionItemType }) => {
  const { link, title, icon } = item || {}
  return (
    <Link href={link} className={styles.action}>
      <Image src={icon} alt="icon" width={20} height={20} />
      <span className={styles.title}>{title}</span>
    </Link>
  )
}

export default ActionItem
