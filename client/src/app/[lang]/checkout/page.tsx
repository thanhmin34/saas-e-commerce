'use client'
import Loading from '@components/loading'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CheckOutPage = dynamic(() => import('@components/pages-components/checkout'), {
  loading: () => <Loading />,
})
const CheckOut = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CheckOutPage />
    </Suspense>
  )
}

export default CheckOut
