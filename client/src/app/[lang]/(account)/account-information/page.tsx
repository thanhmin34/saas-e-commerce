'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import PrivateAccountMenuProvider from '@context/PrivateAccountContext'

const AccountInformation = dynamic(() => import('@components/pages-components/account-information'), {
  ssr: false,
})

const AccountInformationPage = () => {
  return (
    <PrivateAccountMenuProvider>
      <AccountInformation />
    </PrivateAccountMenuProvider>
  )
}

export default AccountInformationPage
