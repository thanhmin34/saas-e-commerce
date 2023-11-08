'use client'
import React, { useCallback, useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { filter, findIndex, map } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { IProductsList } from '@interfaces/redux/product'
import { useProductsListContext } from '@context/productsListContext'
import { filterByProductList } from '@utils/utiils'
import { FILTER_BY_PRODUCTS, FILTER_BY_PRODUCTS_KEY } from '@constants/constants'
import { getValuesFilterByKey } from '@utils/common'

const CheckboxFilter = () => {
  const { setFilterByProducts, filterByProducts } = useProductsListContext()
  const checked = getValuesFilterByKey(filterByProducts, FILTER_BY_PRODUCTS.category.key)

  // const [checked, setChecked] = useState<number[]>(initial)
  const productsData = useSelector((state: RootState) => state.productsList)
  const { category } = productsData

  const handleToggle = useCallback(
    (value: number) => () => {
      const currentIndex = findIndex(checked, (item: number) => item === value)
      const newChecked = [...checked]

      if (currentIndex === -1) {
        newChecked.push(value)
      } else {
        newChecked.splice(currentIndex, 1)
      }

      setFilterByProducts((prevData) => {
        const filterByPriceData = filterByProductList(newChecked, FILTER_BY_PRODUCTS_KEY.CATEGORY)
        const newData = filter(prevData, (item) => item.key !== FILTER_BY_PRODUCTS.category.key)
        return [...newData, ...filterByPriceData]
      })

      // setChecked(newChecked)
    },
    [checked]
  )

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {map(category, (item: { name: string; id: number }) => {
        const labelId = `checkbox-list-label-${item.id}`
        return (
          <ListItem key={item.id} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${item.name}`} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default CheckboxFilter
