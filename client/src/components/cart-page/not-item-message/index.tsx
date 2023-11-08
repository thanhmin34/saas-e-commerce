import useIntl from '@hooks/useIntl'
import React from 'react'

const NoItemMessage = () => {
  const { localizeMessage } = useIntl()
  return <h3 className="no-items-message">{localizeMessage('There are no items in your cart.')}</h3>
}

export default NoItemMessage
