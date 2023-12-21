import React from 'react'

// styles
import styles from './styles.module.scss'

// components

import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import InputPhone from '@components/input-phone'
import InputChecked from '../input-checked'
import InputPrimary from '@components/input/InputPrimary'
import useLoginByPhone from '@lib/auth/useLoginByPhone'
import Loading from '@components/loading'

const LoginPhoneNumber = () => {
  const { localizeMessage } = useIntl()
  const isErrorMess = false
  const errorMessage = ''

  const { phone, errors, isLoading, onSubmit, handleSubmit } = useLoginByPhone()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginPhoneNumber}>
      <h3 className={styles.subTitle}>{localizeMessage('Add your mobile number below to make registration.')}</h3>
      {errors?.phone?.message && (
        <div className={styles.errorMessage}>
          <span>{errorMessage}</span>
        </div>
      )}
      <InputPhone name="phone" paramsRef={phone} className={styles.inputPhone} />
      <Button className={styles.button} type="submit">
        {localizeMessage('Sign In')}
      </Button>
      {/* <LoginWithSocial /> */}
      {isLoading && <Loading />}
    </form>
  )
}

export default LoginPhoneNumber
