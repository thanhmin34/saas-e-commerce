import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import { map } from 'lodash'
import ProductItem from '@components/productItem'
import { ProductItemInterface } from '@interfaces/product'

type Props = {
  products?: ProductItemInterface[]
}

const productSliders = [
  {
    name: 'Recycled Hair Brush - Blue - Medium',
    sku: '',
    price: {
      value: 29.99,
      currency: 'USD',
    },
    special_price: {
      minimum_price: {
        value: 19.99,
        currency: 'USD',
      },
      max_price: {
        value: 29.99,
        currency: 'USD',
      },
    },
    rating_summary: 4.2,
    review_count: 2,
    currency: 'USD',
    image: {
      url: 'https://media.9ten.cloud/media/catalog/product/h/a/hair_brush_-_green_-_large-min.jpg',
      alt: 'test',
    },
    out_of_stock: false,
  },
  {
    name: 'Recycled Hair Brush - Green - Large',
    sku: '',
    price: {
      value: 29.99,
      currency: 'USD',
    },
    special_price: null,
    rating_summary: 0,
    review_count: null,
    currency: 'USD',
    image: {
      url: 'https://media.9ten.cloud/media/catalog/product/h/a/hair_brush_-_yallow_-_medium-min.jpg',
      alt: '',
    },
    out_of_stock: false,
  },
  {
    name: 'Recycled Hair Brush - Blue - Large',
    sku: '',
    price: {
      value: 29.99,
      currency: 'USD',
    },
    special_price: null,
    rating_summary: 3,
    review_count: null,
    currency: 'USD',
    image: {
      url: 'https://media.9ten.cloud/media/catalog/product/h/a/hair_brush_-_yallow_-_large-min.jpg',
      alt: '',
    },
    out_of_stock: false,
  },
  {
    name: 'Recycled Hair Brush - Red - Large',
    sku: '',
    price: {
      value: 29.99,
      currency: 'USD',
    },
    special_price: null,
    rating_summary: 0,
    review_count: null,
    currency: 'USD',
    image: {
      url: 'https://media.9ten.cloud/media/catalog/product/h/a/hair_brush_-_blue_-_medium-min.jpg',
      alt: '2',
    },
    out_of_stock: true,
  },
]

const ProductSliders = (props: Props) => {
  const renderUi = map(productSliders, (item: ProductItemInterface, index) => (
    <Fragment key={index}>
      <ProductItem item={item} />
    </Fragment>
  ))
  return <div className={styles.productsSlider}>{renderUi}</div>
}

export default ProductSliders
