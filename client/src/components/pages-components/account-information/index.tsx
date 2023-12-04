import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import Loading from '@components/loading'
import { DEVICE } from '@constants/device'
import useDetectDevice from '@hooks/useDetectDevice'
import PrivateAccountMenu from './account-menu/PrivateAccountMenu'
import { LIST_ACCOUNT_MENU } from '@constants/account'
import MyProfileInfo from './account-info/MyProfileInfo'
import { usePrivateAccountMenuContext } from '@context/PrivateAccountContext'

const AccountInformation = () => {
  const { device } = useDetectDevice()
  const { selectedTabId } = usePrivateAccountMenuContext()

  function renderNameBreadcrumb() {
    // switch (selectedTabId) {
    //   case LIST_ACCOUNT_MENU.MY_ACCOUNT:
    //     return LIST_BREADCRUMB_ACCOUNT.MY_ACCOUNT
    //   default:
    //     return LIST_BREADCRUMB_ACCOUNT.MY_ACCOUNT
    // }
  }

  function renderContent() {
    switch (selectedTabId) {
      case LIST_ACCOUNT_MENU.MY_ACCOUNT:
        return <MyProfileInfo />
      case LIST_ACCOUNT_MENU.MY_WISHLIST:
        return <div>123</div>
      default:
        return <MyProfileInfo />
    }
  }

  return (
    <Fragment>
      <div className={styles.privateAccountPageContainer}>
        <div className={styles.privateAccountMenuContainer}>
          <PrivateAccountMenu onSignOut={() => {}} />
        </div>
        {/* {device === DEVICE.MOBILE && <AccountInfomationBreadcrumbs name={renderNameBreadcrumb()} />} */}
        <div className={styles.customContent}>{renderContent()}</div>
      </div>

      {/* {loading && <Loading />} */}
    </Fragment>
  )
}

export default AccountInformation
