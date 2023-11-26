import React, { Suspense } from 'react'

import dynamic from 'next/dynamic'
import type { Metadata, ResolvingMetadata } from 'next'

import Loading from '@components/loading'
import { PropsPages } from '@interfaces/global'
import { getProductDetails } from '@lib/products/useProductDetails'
import { IProductDetails, ISeoProduct } from '@interfaces/product/productDetails'
import { get } from 'lodash'
import { HOST } from '@constants/variables'

const ProductDetails = dynamic(() => import('@components/products'), {
  loading: () => <Loading />,
  ssr: true,
})

type Props = {
  params: { product: string; lang: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // fetch data
  const responsive: { product: IProductDetails } = await getProductDetails({ productSku: params?.product })
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: get(responsive, 'product.name', ''),
    keywords: get(responsive, 'product.name', ''),
    description: get(responsive, 'product.name', ''),
    openGraph: {
      images: [get(responsive, 'product.image.url', ''), ...previousImages],
    },
    alternates: {
      canonical: `${HOST}/${params?.lang}/${params.product}`,
    },
  }
}

const ProductDetailsPage = async (props: PropsPages) => {
  const data = await getProductDetails({ productSku: props?.params?.product })
  return (
    <Suspense>
      <ProductDetails product={data?.product} />
    </Suspense>
  )
}

export default ProductDetailsPage
