'use client'

import { RootState } from '@redux/reducers'
import React from 'react'
import { useSelector } from 'react-redux'

const AccountInformationPage = () => {
  const user = useSelector((state: RootState) => state.userInfo)

  return <div>AccountInformationPage</div>
}

export default AccountInformationPage
