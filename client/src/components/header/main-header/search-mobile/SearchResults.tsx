'use client'
import React from 'react'
import styles from './styles.module.scss'
import { ISearchParams } from '@interfaces/category'
import useIntl from '@hooks/useIntl'
import { isEmpty } from 'lodash'
import ProductsResults from './ProductsResults'

interface IPropsSearchResults {
  data: ISearchParams
  searchInput: string
  isLoading: boolean
  onNavigate: () => void
  onClose: () => void
}
const SearchResults = ({ data, searchInput, isLoading, onNavigate, onClose }: IPropsSearchResults) => {
  const { category, products, total_count: totalCount } = data || {}
  const { localizeMessage } = useIntl()

  const renderView = () => {
    if (
      // !isEmpty(category) ||
      !isEmpty(products)
    ) {
      return <ProductsResults products={products} onNavigate={onNavigate} totalCount={totalCount} onClose={onClose} />
    }

    let text = ''
    if (isLoading) {
      text = 'Fetching results...'
    } else if (searchInput?.length >= 3) {
      text = 'No results were found.'
    } else if (searchInput?.length >= 1) {
      text = 'Search term must be at least three characters'
    }
    text = !!text ? text : 'Search for a product'

    return <span className={styles.text}>{localizeMessage(text)}</span>
  }

  return <div className={styles.results}>{renderView()}</div>
}

export default SearchResults
