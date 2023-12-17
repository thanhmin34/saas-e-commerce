import Image from 'next/legacy/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { LIST_SHOW_QTY, TITLE_ACTIONS } from '@constants/home'
import useDetectDevice from '@hooks/useDetectDevice'
import { DEVICE } from '@constants/device'
import { usePrivateAccountMenuContext } from '@context/PrivateAccountContext'
type ActionItemType = {
  link: string
  icon: string
  title: string
}
const MAX_QTY = 100

const ActionItem = ({ item }: { item: ActionItemType }) => {
  const { link, title, icon } = item || {}
  const { device } = useDetectDevice()
  const { localizeMessage } = useIntl()
  const { handleToggleSidebar } = usePrivateAccountMenuContext()
  const { total_quantity } = useSelector((state: RootState) => state.cartData)
  const { wishlist } = useSelector((state: RootState) => state.wishlistData)
  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)

  const handleToggleMenu = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (device !== DEVICE.DESKTOP && title === 'My Account' && isSignedIn) {
        e.preventDefault()
        handleToggleSidebar()
      }
    },
    [device, isSignedIn, title]
  )
  const renderCartQty = () => {
    if (total_quantity >= MAX_QTY) {
      return '99+'
    }

    return total_quantity || 0
  }
  const renderWishlistQty = () => {
    if (wishlist?.length >= MAX_QTY) {
      return '99+'
    }
    return wishlist?.length || 0
  }

  const renderQty = (title: string) => {
    interface IKeyOfObject {
      [x: string]: () => number | '99+'
    }
    const lists: IKeyOfObject = {
      [TITLE_ACTIONS.WISHLIST]: renderWishlistQty,
      [TITLE_ACTIONS.CART]: renderCartQty,
    }
    const listItem = lists[title as keyof IKeyOfObject]
    if (title && listItem) {
      return listItem()
    }
    return 0
  }

  const renderClassCartQty = () => {
    if (LIST_SHOW_QTY.includes(title)) {
      return (
        <div className={`${styles.icon}`}>
          <span className={styles.qty}>{renderQty(title)}</span>
          <Image src={icon} alt="icon" width={20} height={20} />
        </div>
      )
    }
    return <Image src={icon} alt="icon" width={20} height={20} />
  }
  const classByTitle = title ? title.replace(' ', '').toLowerCase() : ''

  return (
    <Link href={link} onClick={handleToggleMenu} className={`${styles.action} ${styles[classByTitle]}`}>
      {renderClassCartQty()}
      <span className={styles.title}>{localizeMessage(title)}</span>
    </Link>
  )
}

export default ActionItem
