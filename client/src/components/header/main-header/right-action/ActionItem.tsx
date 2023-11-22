import Image from 'next/legacy/image'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { RIGHT_HEADER_ACTIONS } from '@constants/home'
type ActionItemType = {
  link: string
  icon: string
  title: string
}
const MAX_QTY = 100

const ActionItem = ({ item }: { item: ActionItemType }) => {
  const { link, title, icon } = item || {}
  const { localizeMessage } = useIntl()

  const { total_quantity } = useSelector((state: RootState) => state.cartData)

  const renderQty = () => {
    if (total_quantity >= MAX_QTY) {
      return '99+'
    }
    return total_quantity || 0
  }

  const renderClassCartQty = () => {
    if (title === RIGHT_HEADER_ACTIONS[2].title) {
      return (
        <div className={styles.icon}>
          <span className={styles.qty}>{renderQty()}</span>
          <Image src={icon} alt="icon" width={20} height={20} />
        </div>
      )
    }
    return <Image src={icon} alt="icon" width={20} height={20} />
  }

  return (
    <Link href={link} className={styles.action}>
      {renderClassCartQty()}
      <span className={styles.title}>{localizeMessage(title)}</span>
    </Link>
  )
}

export default ActionItem
