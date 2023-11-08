import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'

import SortButtonValue from './SortButtonValue'
import SortDropdown from './SortDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { IProductsList } from '@interfaces/redux/product'
type Props = {}

const SortProducts = (props: Props) => {
  const { formatMessage } = useIntl()
  const productsList: IProductsList = useSelector((state: RootState) => state.productsList)

  return (
    <div className={styles.sortProducts}>
      <div className={styles.resultsProducts}>
        {formatMessage({ id: 'Showing 1- 32 of  {value} results' }, { value: productsList?.total_count || 0 })}
      </div>

      <div className={styles.sortBlock}>
        <SortDropdown />
        <SortButtonValue />
      </div>
    </div>
  )
}

export default SortProducts
