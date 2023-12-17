'use client'
import Button from '@components/button'
import InputText from '@components/input/input-text/InputText'
import React, { useRef, useState } from 'react'
import styles from './styles.module.scss'
import useSearchParams from '@lib/category/useSearchParams'
import useOutsideClick from '@hooks/useOutsideClick'
import SearchResults from '../search-mobile/SearchResults'
import { ISearchParams } from '@interfaces/category'
import useIntl from '@hooks/useIntl'

const SearchBlock = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const refSearch = useRef(null)
  const { localizeMessage } = useIntl()
  const { searchInput, onChange, onNavigate, data, isLoading, onResetSearchInput } = useSearchParams()

  useOutsideClick({
    ref: refSearch,
    handleClickOutside: () => setIsOpen(false),
  })

  const handleOpenSearch = () => {
    setIsOpen(true)
  }

  const onNavigatePress = () => {
    setIsOpen(false)
    onNavigate()
  }
  const onClose = () => {
    setIsOpen(false)
    onResetSearchInput()
  }

  return (
    <div ref={refSearch} className={styles.inputSearch}>
      <div className={styles.searchBlock}>
        <InputText
          value={searchInput}
          onChange={onChange}
          className={styles.inputElement}
          placeholder="What are you looking for"
          onFocus={handleOpenSearch}
        />
        <Button
          style={{
            backgroundColor: 'rgb(20, 148, 71',
          }}
          className={styles.buttonElement}
          onClick={onNavigatePress}
        >
          {localizeMessage('Search')}
        </Button>
      </div>
      <div className={`${styles.searchResults} ${isOpen ? styles.active : ''}`}>
        <SearchResults
          data={data as ISearchParams}
          searchInput={searchInput}
          isLoading={isLoading}
          onNavigate={onNavigatePress}
          onClose={onClose}
        />
      </div>
    </div>
  )
}

export default SearchBlock
