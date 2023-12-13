import React, { useState } from 'react'

// styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import Tabs from '@components/uix/tabs'
import { IOrdersItem } from '@interfaces/user'
import { map } from 'lodash'
import ProductItem from './ProductItem'
// constants
interface IPropsItem {
  orderItem: IOrdersItem
}
const ItemOrderMobile = (props: IPropsItem) => {
  const { orderItem } = props
  const { products } = orderItem || {}
  const { localizeMessage } = useIntl()

  const renderView = () => {
    return map(products, (item) => <ProductItem key={item.product_id} item={item} />)
  }
  return (
    <div className={styles.itemOrderMobile}>
      <Tabs title={localizeMessage('Items Ordered')}>
        <div className={styles.itemOrderContent}>{renderView()}</div>
      </Tabs>
    </div>
  )
}

export default ItemOrderMobile
