import React from 'react'

// styles
import styles from './styles.module.scss'

// components

import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import InputPhone from '@components/input-phone'
import InputChecked from '../input-checked'
import InputPrimary from '@components/input/InputPrimary'

//

const LoginPhoneNumber = () => {
  const { localizeMessage } = useIntl()
  const isErrorMess = false
  const errorMessage = ''
  const handleSubmit = () => {}

  return (
    <div className={styles.loginPhoneNumber}>
      <h3 className={styles.subTitle}>{localizeMessage('Add your mobile number below to make registration.')}</h3>
      {isErrorMess && (
        <div className={styles.errorMessage}>
          <span>{errorMessage}</span>
        </div>
      )}
      <InputPhone phone={''} onChange={() => {}} className={styles.inputPhone} />
      <Button className={styles.button} onClick={() => {}}>
        {localizeMessage('Sign In')}
      </Button>
      {/* <LoginWithSocial /> */}
    </div>
  )
}

export default LoginPhoneNumber
