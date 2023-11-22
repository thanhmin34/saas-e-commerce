'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const RegisterAccount = dynamic(() => import('@components/auth/register'), {
  ssr: false,
})

const page = () => {
  return <RegisterAccount />
}

export default page
