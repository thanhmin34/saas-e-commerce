import React from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import LineInfo from './LineInfo'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { IPaymentMethodsItem } from '@interfaces/checkout'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const PaymentInformation = (props: { paymentMethods: IPaymentMethodsItem }) => {
  const { localizeMessage } = useIntl()
  const { paymentMethods } = props || {}
  const { currency } = useSelector((state: RootState) => state.configApp)

  const creditCard = {
    icon: <CreditCardIcon width={20} />,
    title: localizeMessage('Pay with'),
    value: paymentMethods?.name,
  }
  const placeUsing = {
    icon: <AttachMoneyIcon width={20} />,
    title: localizeMessage('Order was placed using'),
    value: currency,
  }
  return (
    <div className={styles.infoView}>
      <div className={styles.headerTitle}>
        <h4 className={styles.subTitleBlock}>{localizeMessage('Payment Information')}</h4>
      </div>
      <div className={styles.block}>
        <LineInfo item={creditCard} />
        <LineInfo item={placeUsing} />
      </div>
    </div>
  )
}

export default PaymentInformation
