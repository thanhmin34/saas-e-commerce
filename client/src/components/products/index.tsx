import React, { Fragment } from 'react'
import { IProductDetails } from '@interfaces/product/productDetails'
import Breadcrumbs from '@components/pages-components/product-details/breadcrumbs'
import ProductContent from '@components/pages-components/product-details/product-content'

type Props = {
  product: IProductDetails | null
}

const ProductDetails = (props: Props) => {
  const { product } = props || {}

  if (!product) return <Fragment />
  return (
    <div className="main-page">
      <Breadcrumbs productName={product?.name || ''} />
      <ProductContent product={product} />
    </div>
  )
}

export default ProductDetails
