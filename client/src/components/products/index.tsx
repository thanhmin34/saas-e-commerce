import { IProductDetails } from '@interfaces/product/productDetails'
import React from 'react'

type Props = {
  product: IProductDetails | null
}

const ProductDetails = (props: Props) => {
  const { product } = props || {}
  return <div>{product?.name}</div>
}

export default ProductDetails
