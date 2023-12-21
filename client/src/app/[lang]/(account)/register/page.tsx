'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const RegisterAccount = dynamic(() => import('@components/auth/register'), {
  ssr: false,
})

const RegisterPage = () => {
  return <RegisterAccount />
}

export default RegisterPage
