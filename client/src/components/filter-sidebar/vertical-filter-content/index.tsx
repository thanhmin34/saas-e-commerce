'use client'

import React from 'react'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import useIntl from '@hooks/useIntl'

import ToggleFilter from '../toggle-filter'
import FilterRange from '@components/filter-range'
import CheckboxFilter from '../checkbox-filter'
import { useProductsListContext } from '@context/productsListContext'

const VerticalFilterContent = () => {
  const { localizeMessage } = useIntl()
  const { handleSubmitFilter, handleClearFilter } = useProductsListContext()

  const renderButton = (
    <div className={styles.footer}>
      <Button onClick={handleClearFilter} className={'button'} variant="outlined" color="success" size="small">
        {localizeMessage('Discard')}
      </Button>
      <Button onClick={handleSubmitFilter} className={'button'} variant="contained" color="success" size="small">
        {localizeMessage('Apply')}
      </Button>
    </div>
  )

  const renderContent = (
    <div className={styles.main}>
      <h3 className={styles.title}>{localizeMessage('Filters')}</h3>
      <ToggleFilter title={'Price'}>
        <FilterRange />
      </ToggleFilter>
      <ToggleFilter title={'Category'}>
        <CheckboxFilter />
      </ToggleFilter>
    </div>
  )
  return (
    <div className={styles.verticalFilter} id="filterCategory">
      <div className={styles.filter}>
        {renderContent}
        {renderButton}
      </div>
    </div>
  )
}

export default VerticalFilterContent
