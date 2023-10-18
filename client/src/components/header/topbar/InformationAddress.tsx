import useIntl from '@hooks/useIntl'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.scss'
import { SPACE_SYMBOL } from '@constants/symbol'

const InformationAddress = () => {
  const { localizeMessage, formatMessage } = useIntl()
  const amountFreeShipping = 59

  const content = (
    <div>
      <Link href={'/'}>
        <strong>{localizeMessage('Download Our App')}</strong>
      </Link>
      {SPACE_SYMBOL}
      {formatMessage(
        { id: 'And Have A great Shopping Experience ** Free shipping For Orders Over {value} USD' },
        {
          value: amountFreeShipping,
        }
      )}
    </div>
  )

  return content
}

export default InformationAddress
