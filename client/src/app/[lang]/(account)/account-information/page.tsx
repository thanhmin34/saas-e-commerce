'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@components/loading'
// import PrivateAccountMenuProvider from '@context/PrivateAccountContext'

const AccountInformation = dynamic(() => import('@components/pages-components/account-information'), {
  ssr: false,
})

const AccountInformationPage = () => {
  return (
    // <PrivateAccountMenuProvider>
    <Suspense fallback={<Loading />}>
      <AccountInformation />
    </Suspense>
    // </PrivateAccountMenuProvider>
  )
}

export default AccountInformationPage
