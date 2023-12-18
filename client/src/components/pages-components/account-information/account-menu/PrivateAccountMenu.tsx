import { map } from 'lodash'
import { useSelector } from 'react-redux'
import React, { Fragment, useCallback, useRef } from 'react'

import useIntl from '@hooks/useIntl'
import { RootState } from '@redux/reducers'
import useDetectDevice from '@hooks/useDetectDevice'
import { SIZE_ICON } from '@constants/variables'
import { IUserInfo } from '@interfaces/redux/userInfo'

import styles from './styles.module.scss'
import { DEVICE } from '@constants/device'
import { imageUrls } from '@constants/imageUrls'
import { LIST_ACCOUNT_MENU } from '@constants/account'

import CloseIcon from '@mui/icons-material/Close'
import PrivateAccountMenuItem from './PrivateAccountMenuItem'
import { usePrivateAccountMenuContext } from '@context/PrivateAccountContext'
import useSignOut from '@lib/auth/useSignOut'

//constants

const DEFAULT_ICON_SIZE = {
  widthIcon: SIZE_ICON.WIDTH_DEFAULT,
  heightIcon: SIZE_ICON.HEIGHT_DEFAULT,
}

export default function PrivateAccountMenu() {
  const { localizeMessage } = useIntl()
  const { onSignOut } = useSignOut()
  const { device } = useDetectDevice()
  const { isMenuSidebarShowed, handleToggleSidebar, selectedTabId, handleSelectedTab } = usePrivateAccountMenuContext()

  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const { address } = useSelector((state: RootState) => state.addressData)
  const { wishlist } = useSelector((state: RootState) => state.wishlistData)

  const { firstname = '', lastname = '', email = '' } = userInfo as IUserInfo
  const fullname = `${firstname} ${lastname}`

  const createTitle = (title: string, text: string, count?: number) => (
    <Fragment>
      <p className="private-account-menu__sidebarTitle">{localizeMessage(title)}</p>
      <p className="private-account-menu__sidebarText">
        {count} {localizeMessage(text)}
      </p>
    </Fragment>
  )

  const renderTitleAccountInfo = useCallback(() => {
    if (device === DEVICE.DESKTOP) return createTitle('Profile', 'Personal information')
    return (
      <div>
        <p>{fullname}</p>
        <p className="text--gray">{email}</p>
      </div>
    )
  }, [fullname, device])

  const menuItemList = [
    {
      id: LIST_ACCOUNT_MENU.MY_ACCOUNT,
      icon: imageUrls.iconAccountInfo,
      ...DEFAULT_ICON_SIZE,
      title: renderTitleAccountInfo(),
    },
    {
      id: LIST_ACCOUNT_MENU.MY_ADDRESSES,
      icon: imageUrls.iconAccountAddress,
      ...DEFAULT_ICON_SIZE,
      title: createTitle('My Addresses', `Saved addresses`, address?.length || 0),
    },
    {
      id: LIST_ACCOUNT_MENU.MY_ORDERS,
      icon: imageUrls.iconAccountOrder,
      ...DEFAULT_ICON_SIZE,
      title: createTitle('My Orders', `Orders`, 2),
    },
    {
      id: LIST_ACCOUNT_MENU.MY_WISHLIST,
      icon: imageUrls.iconAccountWishlist,
      ...DEFAULT_ICON_SIZE,
      title: createTitle('My Wish List', `Product items`, wishlist?.length || 0),
    },
    {
      id: LIST_ACCOUNT_MENU.LOGOUT,
      icon: imageUrls.iconAccountLogout,
      ...DEFAULT_ICON_SIZE,
      title: createTitle('Sign Out', 'You can leave website'),
    },
  ]

  const handlePressMenu = (id: string) => {
    if (id === LIST_ACCOUNT_MENU.LOGOUT) {
      onSignOut()
      return
    }

    handleSelectedTab(id)
    handleToggleSidebar()
  }

  const renderHeaderMobileMenu = () => (
    <div className={styles.menuHeader}>
      <span>{localizeMessage('Account menu')}</span>
      <button onClick={handleToggleSidebar} className={styles.button}>
        <CloseIcon width={20} />
      </button>
    </div>
  )

  const renderMenuList = () => {
    return map(menuItemList, (item) => (
      <PrivateAccountMenuItem
        item={item}
        handlePressMenu={handlePressMenu}
        selectedTabId={selectedTabId}
        key={item?.id}
      />
    ))
  }
  const renderClassName = useCallback(() => {
    let className = styles.privateAccountMenu
    if (device !== DEVICE.DESKTOP) {
      className += ` ${styles.mobile} ${styles.sidebar}`
      if (isMenuSidebarShowed) {
        className += `  ${styles.sidebarEnabled}`
        return className
      }
    }

    return className
  }, [device, isMenuSidebarShowed])

  return (
    <div className={renderClassName()}>
      {renderHeaderMobileMenu()}
      {renderMenuList()}
    </div>
  )
}
