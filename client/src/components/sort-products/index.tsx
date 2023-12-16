import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'

import SortButtonValue from './SortButtonValue'
import SortDropdown from './SortDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { IProductsList } from '@interfaces/redux/product'
import TuneIcon from '@mui/icons-material/Tune'
import Button from '@components/button'
import { useProductsListContext } from '@context/productsListContext'
type Props = {}

const SortProducts = (props: Props) => {
  const { formatMessage, localizeMessage } = useIntl()
  const productsList: IProductsList = useSelector((state: RootState) => state.productsList)
  const { onToggleSideBarFilter } = useProductsListContext()

  return (
    <div className={styles.sortProducts}>
      <div className={styles.resultsProducts}>
        {formatMessage({ id: 'Showing 1- 32 of  {value} results' }, { value: productsList?.total_count || 0 })}
      </div>

      <div className={styles.sortBlock}>
        <Button onClick={onToggleSideBarFilter} className={styles.buttonFilter}>
          <div className={styles.filter}>
            {localizeMessage('Filter')}
            <TuneIcon width={20} color="inherit" />
          </div>
        </Button>
        <SortDropdown />
        <SortButtonValue />
      </div>
    </div>
  )
}

export default SortProducts
