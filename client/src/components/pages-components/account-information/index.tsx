'use client'
import dynamic from 'next/dynamic'
import React, { Fragment, Suspense } from 'react'
import styles from './styles.module.scss'
import Loading from '@components/loading'
import useDetectDevice from '@hooks/useDetectDevice'
import { LIST_ACCOUNT_MENU } from '@constants/account'
import { usePrivateAccountMenuContext } from '@context/PrivateAccountContext'
import useMyAddress from '@lib/account-information/useMyAddress'
import useWishlist from '@lib/account-information/useWishlist'
import MyOrders from './my-orders'
import useMyOrders from '@lib/account-information/useMyOrder'

const PrivateAccountMenu = dynamic(() => import('./account-menu/PrivateAccountMenu'), {
  ssr: false,
})
const MyAddress = dynamic(() => import('./my-address'), {
  ssr: false,
})

const MyProfileInfo = dynamic(() => import('./account-info/MyProfileInfo'), {
  ssr: false,
})

const MyWishlist = dynamic(() => import('./my-wishlist'), {
  ssr: false,
})

const AccountInformation = () => {
  const { device } = useDetectDevice()
  const { selectedTabId } = usePrivateAccountMenuContext()
  const { addressData, onCreateAddress, onDeleteAddress, isLoading } = useMyAddress()
  const { onAddProductInWishlist, onDeleteProductWishlist } = useWishlist({ enabled: true })
  useMyOrders({ enabled: true })

  function renderNameBreadcrumb() {
    // switch (selectedTabId) {
    //   case LIST_ACCOUNT_MENU.MY_ACCOUNT:
    //     return LIST_BREADCRUMB_ACCOUNT.MY_ACCOUNT
    //   default:
    //     return LIST_BREADCRUMB_ACCOUNT.MY_ACCOUNT
    // }
  }

  function renderContent() {
    interface IViewUi {
      [x: string]: React.JSX.Element
    }

    const viewUi: IViewUi = {
      [LIST_ACCOUNT_MENU.MY_ACCOUNT]: <MyProfileInfo />,
      [LIST_ACCOUNT_MENU.MY_ADDRESSES]: (
        <MyAddress addressData={addressData} onCreateAddress={onCreateAddress} onDeleteAddress={onDeleteAddress} />
      ),
      [LIST_ACCOUNT_MENU.MY_WISHLIST]: (
        <MyWishlist onAddProductInWishlist={onAddProductInWishlist} onDeleteProductWishlist={onDeleteProductWishlist} />
      ),
      [LIST_ACCOUNT_MENU.MY_ORDERS]: <MyOrders />,
    }

    if (viewUi && viewUi[selectedTabId as keyof IViewUi]) {
      return <Suspense fallback={<Loading />}>{viewUi[selectedTabId]}</Suspense>
    }
    return <Fragment />
  }

  return (
    <Fragment>
      <div className={styles.privateAccountPageContainer}>
        <div className={styles.privateAccountMenuContainer}>
          <Suspense fallback={<Loading />}>
            <PrivateAccountMenu />
          </Suspense>
        </div>
        {/* {device === DEVICE.MOBILE && <AccountInfomationBreadcrumbs name={renderNameBreadcrumb()} />} */}
        <div className={styles.customContent}>{renderContent()}</div>
      </div>
      {isLoading && <Loading />}
    </Fragment>
  )
}

export default AccountInformation
