'use client'
import React, { useCallback, useState } from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import { useInterval } from '@hooks/useInterval'
import { MINUTED, OTP_EXPIRED_TIME } from '@constants/login'

interface Props {
  handleOnResend: () => Promise<boolean>
  countTime: number
}

const Expired = (props: Props) => {
  const { handleOnResend, countTime: firstCountTime } = props || {}
  const { localizeMessage } = useIntl()

  const { useIntervalTime } = useInterval()
  const [show, setShow] = useState(false)

  const [countTime, setCountTime] = useState(firstCountTime)

  useIntervalTime(() => {
    if (countTime > 0) {
      setCountTime(countTime - 1)
      setShow(false)
    } else {
      setShow(true)
    }
  }, 1000)

  const onResendPress = useCallback(() => {
    const isResend = handleOnResend()
    isResend.then((data) => {
      if (data) {
        setCountTime(OTP_EXPIRED_TIME)
      }
    })
  }, [countTime])

  const seconds = countTime < 10 ? `0${countTime}` : `${countTime}`
  const fullSeconds = `${MINUTED}${seconds}`

  return (
    <div className={styles.body}>
      <div className={styles.left}>
        <p>{localizeMessage('Expired')}</p>
        <span>{fullSeconds}</span>
      </div>
      {show && (
        <div className={styles.buttonSubmit}>
          <div onClick={() => onResendPress()}>{localizeMessage('Resent code')}</div>
        </div>
      )}
    </div>
  )
}

export default Expired
