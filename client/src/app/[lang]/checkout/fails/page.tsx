'use client'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import Loading from '@components/loading'

const OrderFails = dynamic(() => import('@components/pages-components/checkout/order-fails'), {
  loading: () => <Loading />,
  ssr: false,
})

const CheckoutFails = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OrderFails />
    </Suspense>
  )
}

export default CheckoutFails
