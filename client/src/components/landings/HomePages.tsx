'use client'
import useDetectDevice from '@hooks/useDetectDevice'
import useIntl from '@hooks/useIntl'

const HomePages = ({}) => {
  const { localizeMessage, formatMessage } = useIntl()
  const { device, innerWidth } = useDetectDevice()

  return <div>{formatMessage({ id: '{value} test' }, { value: 3123 })}</div>
}

export default HomePages
