'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@components/auth/login'), {
  ssr: false,
})

type Props = {
  lang: string
  page: string
}

const page = ({ params }: { params: Props }) => {
  return <Login />
}

export default page
