import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { IProductsList } from '@interfaces/redux/product'
import { isEmpty, map } from 'lodash'
import ProductItem from '@components/productItem'
import useIntl from '@hooks/useIntl'

const ProductsListContainer = () => {
  const productsList: IProductsList = useSelector((state: RootState) => state.productsList)
  const { localizeMessage } = useIntl()

  const renderProductsList = () => {
    return map(productsList?.products, (item, index) => {
      return (
        <Fragment key={index}>
          <ProductItem item={item} />
        </Fragment>
      )
    })
  }
  return (
    <div className={styles.container}>
      {isEmpty(productsList?.products) && (
        <div className={styles.noResultText}>{localizeMessage('No results found!')}</div>
      )}
      <div className={styles.productsListContainer}>{renderProductsList()}</div>
    </div>
  )
}

export default ProductsListContainer
