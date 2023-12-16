import React, { useRef } from 'react'
import styles from './styles.module.scss'
import InputText from '@components/input/input-text/InputText'
import SearchIcon from '@mui/icons-material/Search'
import useIntl from '@hooks/useIntl'
import useSearchParams from '@lib/category/useSearchParams'
import SearchResults from './SearchResults'
import { ISearchParams } from '@interfaces/category'
import useOutsideClick from '@hooks/useOutsideClick'

interface PropsInputSearch {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const InputSearch = (props: PropsInputSearch) => {
  const { isOpen, setIsOpen } = props || {}
  const refSearch = useRef(null)
  const { localizeMessage } = useIntl()
  const { searchInput, onChange, onNavigate, data, isLoading } = useSearchParams()

  useOutsideClick({
    ref: refSearch,
    handleClickOutside: () => setIsOpen(false),
  })

  const onNavigatePress = () => {
    setIsOpen(false)
    onNavigate()
  }

  const searchInputBlock = (
    <div className={styles.inputElement}>
      <InputText
        className={styles.input}
        placeholder={localizeMessage('Search Input')}
        value={searchInput}
        onChange={onChange}
      />
      <button onClick={onNavigatePress} className={styles.button}>
        <SearchIcon width={20} />
      </button>
    </div>
  )

  return (
    <div ref={refSearch} className={`${styles.inputContainer} ${isOpen ? styles.active : ''}`}>
      {searchInputBlock}
      <SearchResults
        data={data as ISearchParams}
        searchInput={searchInput}
        isLoading={isLoading}
        onNavigate={onNavigatePress}
      />
    </div>
  )
}

export default InputSearch
