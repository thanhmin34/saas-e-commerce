'use client'
import { map } from 'lodash'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import React, { Fragment, useMemo } from 'react'

import styles from './styles.module.scss'
import { DEFAULT_DISPLAY_PAGINATION, PAGE_RANGE_DISPLAYED, PAGE_SIZE } from '@constants/account'
import useIntl from '@hooks/useIntl'
import { RootState } from '@redux/reducers'
import HeaderTable from '../header'
import RowTable from '../row'
import { IOrdersItem } from '@interfaces/user'
import useMyOrders from '@lib/account-information/useMyOrder'
import Loading from '@components/loading'
interface IPropsOrderGrid {
  onChangeOrder: (item: IOrdersItem | null) => void
  isShow: boolean
}

const OrderGrid = ({ onChangeOrder, isShow }: IPropsOrderGrid) => {
  const { localizeMessage } = useIntl()
  const { orders, total_count } = useSelector((state: RootState) => state.ordersData)
  const { setCurrentPage, currentPage, isLoading } = useMyOrders({ enabled: false })
  const pageCount = Math.ceil(total_count / DEFAULT_DISPLAY_PAGINATION)
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  const initialPage = useMemo(() => {
    return currentPage <= 1 ? 0 : currentPage - 1
  }, [currentPage])

  return (
    <Fragment>
      {isShow && <h2 className={styles.titleOrder}>{localizeMessage('My Orders')}</h2>}
      <div className={styles.myOrderListDesktop}>
        <table className={styles.table}>
          <HeaderTable />
          {map(orders, (item) => {
            return <Fragment key={item?.id}>{<RowTable item={item} onChangeOrder={onChangeOrder} />}</Fragment>
          })}
        </table>
      </div>
      {total_count > DEFAULT_DISPLAY_PAGINATION && (
        <div className={styles.pagination}>
          <ReactPaginate
            breakLabel="..."
            nextLabel={localizeMessage('Next')}
            onPageChange={handlePageClick}
            pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
            pageCount={pageCount}
            previousLabel={localizeMessage('Previous')}
            renderOnZeroPageCount={null}
            activeClassName={styles.selected}
            initialPage={initialPage}
          />
        </div>
      )}
      {isLoading && <Loading />}
    </Fragment>
  )
}

export default OrderGrid
