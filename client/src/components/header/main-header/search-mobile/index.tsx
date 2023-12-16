'use client'
import React, { useCallback, useState } from 'react'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import InputSearch from './InputSearch'

const SearchMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [isOpen])

  return (
    <div className={styles.searchMobile}>
      <button onClick={onToggle} className={styles.button}>
        <SearchIcon width={24} />
      </button>
      <InputSearch isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default SearchMobile
