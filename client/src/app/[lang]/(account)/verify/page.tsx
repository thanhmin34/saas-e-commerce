'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const VerifyOTP = dynamic(() => import('@components/pages-components/verify'), {
  ssr: false,
})

const VerifyOTPPage = () => {
  return <VerifyOTP />
}

export default VerifyOTPPage
