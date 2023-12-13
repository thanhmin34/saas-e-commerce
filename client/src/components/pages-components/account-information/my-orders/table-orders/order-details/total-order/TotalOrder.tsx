import { map } from 'lodash'
import React, { Fragment } from 'react'

// styles
import styles from './styles.module.scss'
import { IOrdersItem } from '@interfaces/user'
import useIntl from '@hooks/useIntl'
import Price from '@components/productItem/Price'

interface IPropsTotal {
  orderItem: IOrdersItem
  className?: string
}
const TotalOrder = (props: IPropsTotal) => {
  const { localizeMessage } = useIntl()
  const { orderItem, className } = props || {}

  const { prices } = orderItem || {}
  const { tax_amount = 0, total = 0, total_payment = 0, discount_amount = 0, shipping_amount = 0 } = prices || {}

  const totalData = [
    {
      price: total,
      name: 'Subtotal',
      display: true,
    },
    {
      price: shipping_amount,
      name: 'Shipping & Handing',
      display: true,
    },
    {
      price: tax_amount,
      name: 'Tax',
      display: true,
    },
    // {
    //   price: CODFee,
    //   name: 'COD fee',
    //   display: !!CODFee,
    // },
    // {
    //   price: wallettCredit,
    //   name: 'Wallet Credit Discount',
    //   display: !!wallettCredit,
    // },
    {
      price: discount_amount,
      name: 'Discount',
      display: !!discount_amount,
    },
    {
      price: total_payment,
      name: 'Grand Total:',
      display: true,
    },
  ]

  const classNames = `${styles.total} ${className} `

  const renderTotalData = () => {
    return map(totalData, (item) => {
      const { display } = item || {}
      if (!display) return <Fragment key={item.name} />
      return (
        <div key={item.name} className={styles.totalItem}>
          <div>{localizeMessage(item.name)}</div>
          <div className={styles.price}>
            <Price value={+item.price} />
          </div>
        </div>
      )
    })
  }
  return (
    <div className={classNames}>
      <h1 className={styles.title}>{localizeMessage('Total')}</h1>
      {renderTotalData()}
    </div>
  )
}

export default TotalOrder
