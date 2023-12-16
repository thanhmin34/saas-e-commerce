'use client'

import React, { useRef } from 'react'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import useIntl from '@hooks/useIntl'

import ToggleFilter from '../toggle-filter'
import FilterRange from '@components/filter-range'
import CheckboxFilter from '../checkbox-filter'
import CloseIcon from '@mui/icons-material/Close'
import { useProductsListContext } from '@context/productsListContext'

const VerticalFilterContent = () => {
  const { localizeMessage } = useIntl()
  const { handleSubmitFilter, handleClearFilter, isOpen, onToggleSideBarFilter } = useProductsListContext()

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
      <div className={styles.headerFilter}>
        <h3 className={styles.title}>{localizeMessage('Filters')}</h3>
        <div className={styles.icon} onClick={onToggleSideBarFilter}>
          <CloseIcon className={styles.icon} width={24} />
        </div>
      </div>
      <ToggleFilter title={'Price'}>
        <FilterRange />
      </ToggleFilter>
      <ToggleFilter title={'Category'}>
        <CheckboxFilter />
      </ToggleFilter>
    </div>
  )
  return (
    <div className={`${styles.verticalFilter} ${isOpen ? styles.activeOverlay : ''}`} id="filterCategory">
      <div className={`${styles.filter} ${isOpen ? styles.activeFilter : ''}`}>
        {renderContent}
        {renderButton}
      </div>
      {isOpen && <div onClick={onToggleSideBarFilter} className={styles.outlined} />}
    </div>
  )
}

export default VerticalFilterContent
