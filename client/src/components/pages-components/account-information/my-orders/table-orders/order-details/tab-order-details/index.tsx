import React, { useMemo, useState } from 'react'
// styles
import styles from './styles.module.scss'
// constants

import useIntl from '@hooks/useIntl'
import { TABS_TABLE, TAB_ORDER } from '@constants/account'
import ItemsOrder from '../items-order'
import { IOrdersItem } from '@interfaces/user'
import ReviewOrder from '../review-order'

interface IPropsTab {
  orderItem: IOrdersItem
}
const TabOrderDetails = (props: IPropsTab) => {
  const { orderItem } = props || {}
  const { status, id: orderId } = orderItem || {}
  const [selectTabId, setSelectTabId] = useState(TAB_ORDER.ITEM_ORDER)
  const { localizeMessage } = useIntl()

  const renderTabSelect = useMemo(() => {
    switch (selectTabId) {
      case TAB_ORDER.ITEM_ORDER:
        return <ItemsOrder orderItem={orderItem} selectTabId={selectTabId} />
      // case TAB_ORDER.INVOICES:
      //   return <Invoices selectTabId={selectTabId} />
      // case TAB_ORDER.ORDER_SHIPMENTS:
      //   return <OrderShipments selectTabId={selectTabId} />
      case TAB_ORDER.REVIEW_ORDER:
        return <ReviewOrder status={status} orderId={orderId} />
      default:
        break
    }
  }, [selectTabId])

  const renderTab = (
    <div className={styles.tab}>
      {TABS_TABLE.map((tab, index) => (
        <div
          className={`${styles.tabItem}`}
          // style={{
          //   backgroundColor: index === selectTabId ? backgroundActiveTab : '',
          //   color: index === selectTabId ? colorActiveTab : '',
          // }}
          onClick={() => setSelectTabId(index)}
          key={index}
        >
          {localizeMessage(tab)}
        </div>
      ))}
    </div>
  )
  return (
    <div className={styles.tabOrderDetails}>
      {renderTab}
      {renderTabSelect}
    </div>
  )
}

export default TabOrderDetails
