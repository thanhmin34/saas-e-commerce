import { map } from 'lodash'
import useIntl from '@hooks/useIntl'
import React, { Fragment, useCallback } from 'react'
import styles from './styles.module.scss'
import { SORT_PRODUCTS_OPTION } from '@constants/constants'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useProductsListContext } from '@context/productsListContext'
type Props = {}

const SortDropdown = (props: Props) => {
  const { setSortByProducts, sortByProducts } = useProductsListContext()
  const { localizeMessage } = useIntl()
  const { order_name } = sortByProducts || {}

  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      const { value } = e.target
      setSortByProducts((prevData) => {
        return { ...prevData, order_name: value }
      })
    },
    [order_name]
  )

  return (
    <Fragment>
      <FormControl className={styles.sortDropdown} sx={{ m: 1, minWidth: 80 }} size="small">
        <InputLabel id="demo-simple-select-label">{localizeMessage('Sort')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortByProducts.order_name}
          label="Sort"
          onChange={handleChange}
        >
          {map(SORT_PRODUCTS_OPTION, (item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  )
}

export default SortDropdown
