'use client'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import Loading from '@components/loading'

const SuccessOrder = dynamic(() => import('@components/pages-components/checkout/order-success'), {
  loading: () => <Loading />,
  ssr: false,
})
const CheckoutSuccess = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessOrder />
    </Suspense>
  )
}

export default CheckoutSuccess
