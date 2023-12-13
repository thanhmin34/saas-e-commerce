import React, { Fragment, useMemo } from 'react'
import { get, map } from 'lodash'
// styles
import styles from './styles.module.scss'
import OrderRowItem from './OrderRowItem'

// constants
import { IProductItemByOrders } from '@interfaces/user'
import useIntl from '@hooks/useIntl'
import { HEADER_ROW_ITEMS } from '@constants/account'

interface IPropsItems {
  selectTabId: number
  products: IProductItemByOrders[] | []
  title?: string
}

const ItemOrderWrapper = ({ selectTabId, products, title }: IPropsItems) => {
  const { localizeMessage } = useIntl()

  const renderOrderItem = useMemo(() => {
    const tabIdActive = [0, 1, 2]
    if (tabIdActive.includes(selectTabId)) {
      return map(products, (item, index) => <OrderRowItem key={index} item={item} />)
    }
    return <Fragment />
  }, [selectTabId, products])

  const renderHeader = (
    <div className={styles.hederRow}>
      {HEADER_ROW_ITEMS.map((item, index) => (
        <div key={index} className={styles.hederRowItem}>
          {localizeMessage(item)}
        </div>
      ))}
    </div>
  )
  return (
    <div>
      {/* <>{title}</> */}
      {renderHeader}
      {renderOrderItem}
    </div>
  )
}

export default ItemOrderWrapper
