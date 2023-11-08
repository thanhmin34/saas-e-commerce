import React from 'react'

type Props = {
  params: {
    lang: string
    product: string
  }
}
import { Metadata } from 'next'
import { pagesType } from '@constants/ssr'
import useSortProductsInCategory from '@lib/category/useSortProductsInCategory'

export const metadata: Metadata = {
  title: '123.js',
}
const page = (props: Props) => {
  return <div>page [[]]</div>
}

export default page
