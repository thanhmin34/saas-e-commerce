// context.tsx
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import useProductsList from '@hooks/useProductsList'
import { IProductsList } from '@interfaces/redux/product'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IFilterProduct, ISortProduct } from '@interfaces/product/productList'
import { SORT_DEFAULTS } from '@constants/products'
import { DEFAULT_FILTER_BY_PRODUCTS, FILTER_BY_PRODUCTS } from '@constants/variables'

const ProductListContext = createContext<{
  productsData: IProductsList | {}
  sortByProducts: ISortProduct
  setSortByProducts: React.Dispatch<React.SetStateAction<ISortProduct>>
  filterByProducts: IFilterProduct[]
  setFilterByProducts: React.Dispatch<React.SetStateAction<[] | IFilterProduct[]>>
  handleSubmitFilter: () => void
  handleClearFilter: () => void
}>({
  productsData: {},
  sortByProducts: SORT_DEFAULTS,
  setSortByProducts: () => {},
  filterByProducts: [],
  setFilterByProducts: () => {},
  handleSubmitFilter: () => {},
  handleClearFilter: () => {},
})

export function useProductsListContext() {
  const context = useContext(ProductListContext)
  if (!context) {
    throw new Error('ERROR')
  }
  return context
}

interface IProductsListContextProvider {
  children: ReactNode
}

export function ProductsListContextProvider({ children }: IProductsListContextProvider) {
  const { slug } = useParams()

  const [pageSize, setPageSize] = useState<number>(20)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortByProducts, setSortByProducts] = useState<ISortProduct>(SORT_DEFAULTS)

  const [filterByProducts, setFilterByProducts] = useState<IFilterProduct[]>(DEFAULT_FILTER_BY_PRODUCTS)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const handleSubmitFilter = () => {
    setIsSubmit((prev) => !prev)
  }

  const handleClearFilter = () => {
    setFilterByProducts(DEFAULT_FILTER_BY_PRODUCTS)
  }

  useProductsList({
    url: slug as string,
    pageSize,
    currentPage,
    sortByProducts,
    filterByProducts: filterByProducts,
    isSubmit,
  })

  const productsData = useSelector((state: RootState) => state.productsList)

  return (
    <ProductListContext.Provider
      value={{
        productsData,
        sortByProducts,
        setSortByProducts,
        filterByProducts,
        setFilterByProducts,
        handleSubmitFilter,
        handleClearFilter,
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}
