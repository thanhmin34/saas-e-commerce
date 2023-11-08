import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { IProductsList } from '@interfaces/redux/product'
import { map } from 'lodash'
import ProductItem from '@components/productItem'
type Props = {}

const ProductsListContainer = (props: Props) => {
  const productsList: IProductsList = useSelector((state: RootState) => state.productsList)

  const renderProductsList = () => {
    return map(productsList.products, (item, index) => {
      return (
        <Fragment key={index}>
          <ProductItem item={item} />
        </Fragment>
      )
    })
  }
  return <div className={styles.productsListContainer}>{renderProductsList()}</div>
}

export default ProductsListContainer
