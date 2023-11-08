'use client'
import React, { Suspense } from 'react'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import Loading from '@components/loading'
import { ProductsListContextProvider } from '@context/productsListContext'

const SortProducts = dynamic(() => import('@components/sort-products'), {
  loading: () => <Loading />,
})
const ProductsListContainer = dynamic(() => import('@components/products-list-container'), {
  loading: () => <Loading />,
})
const VerticalFilterContent = dynamic(() => import('@components/filter-sidebar/vertical-filter-content'), {
  loading: () => <Loading />,
})

const ProductsList = () => {
  return (
    <ProductsListContextProvider>
      <div className={styles.productsList}>
        <Suspense fallback={<Loading />}>
          <SortProducts />
        </Suspense>
        <div className={styles.content}>
          <Suspense fallback={<Loading />}>
            <VerticalFilterContent />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <ProductsListContainer />
          </Suspense>
        </div>
      </div>
    </ProductsListContextProvider>
  )
}

export default ProductsList
