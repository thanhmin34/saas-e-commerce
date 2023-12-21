'use client'
import useIntl from '@hooks/useIntl'
import useVerifyOTP from '@lib/auth/useVerifyOTP'
import { RootState } from '@redux/reducers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import OtpInput from 'react-otp-input'
import { ROUTER_PATHS } from '@constants/routerPaths'
import Expired from './Expired'
import { NUMBER_INPUT_OTP, OTP_EXPIRED_TIME } from '@constants/login'

const VerifyOTP = () => {
  const { phone, onSubmit, onResend } = useVerifyOTP()

  const { localizeMessage } = useIntl()
  const { push } = useRouter()
  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)
  const [otp, setOtp] = useState('')

  const handleOnResend = () => {
    const isResend = onResend()
    isResend.then((data) => {
      if (data) {
        setOtp('')
      }
    })
    return isResend
  }

  const renderFromInputOTP = () => {
    return (
      <form action="" className={styles.form}>
        <div dir="ltr" className={`${styles.otp}`}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={NUMBER_INPUT_OTP}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus={true}
          />
        </div>
      </form>
    )
  }

  useEffect(() => {
    if (otp && otp.length === NUMBER_INPUT_OTP) {
      onSubmit(otp)
    }
  }, [otp])

  useEffect(() => {
    if (!phone && !isSignedIn) {
      push(ROUTER_PATHS.LOGIN)
    }
  }, [phone, isSignedIn])

  return (
    <section className={styles.verificationSection}>
      <div className={styles.verification}>
        <div className={`${styles.content}`}>
          <div className={`${styles.title}`}>
            <h2>{localizeMessage('Verification code')}</h2>
          </div>
          <div className={styles.description}>
            {localizeMessage('We have to sent the code verification to your mobile phone')}
          </div>
          {renderFromInputOTP()}
          <Expired handleOnResend={handleOnResend} countTime={OTP_EXPIRED_TIME} />
        </div>
      </div>
    </section>
  )
}

export default VerifyOTP
