'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@components/auth/login'), {
  ssr: false,
})

const LoginPage = () => {
  return <Login />
}

export default LoginPage
