// context.tsx
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import useProductsList from '@hooks/useProductsList'
import { IProductsList } from '@interfaces/redux/product'
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
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
  onToggleSideBarFilter: () => void
  isOpen: boolean
}>({
  productsData: {},
  sortByProducts: SORT_DEFAULTS,
  setSortByProducts: () => {},
  filterByProducts: [],
  setFilterByProducts: () => {},
  handleSubmitFilter: () => {},
  handleClearFilter: () => {},
  onToggleSideBarFilter: () => {},
  isOpen: false,
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
  console.log('slug', slug)

  const [pageSize, setPageSize] = useState<number>(20)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortByProducts, setSortByProducts] = useState<ISortProduct>(SORT_DEFAULTS)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [filterByProducts, setFilterByProducts] = useState<IFilterProduct[]>(DEFAULT_FILTER_BY_PRODUCTS)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const handleSubmitFilter = () => {
    setIsOpen(false)
    setIsSubmit((prev) => !prev)
  }

  const onToggleSideBarFilter = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [isOpen])

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
        onToggleSideBarFilter,
        isOpen,
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}
