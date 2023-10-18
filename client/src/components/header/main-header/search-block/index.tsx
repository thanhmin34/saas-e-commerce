import Button from '@components/button'
import InputText from '@components/input/input-text/InputText'
import React, { useState } from 'react'
import styles from './styles.module.scss'
type Props = {}

const SearchBlock = (props: Props) => {
  const onSearch = () => {}
  const [search, setSearch] = useState('')

  const onChangeText = () => {}
  return (
    <div className={styles.searchBlock}>
      <InputText
        value={search}
        onChange={onChangeText}
        className={styles.inputElement}
        placeholder="What are you looking for"
      />
      <Button
        style={{
          backgroundColor: 'rgb(20, 148, 71',
        }}
        className={styles.buttonElement}
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBlock
