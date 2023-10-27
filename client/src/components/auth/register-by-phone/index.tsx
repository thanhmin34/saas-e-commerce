import React from 'react'

// styles
import styles from './styles.module.scss'

// components

import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import InputPhone from '@components/input-phone'
import InputPrimary from '@components/input/InputPrimary'

const RegisterByPhone = () => {
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
      <InputPrimary placeholder={localizeMessage('First name')} value="" onChange={() => {}} />
      <InputPrimary placeholder={localizeMessage('Last name')} value="" onChange={() => {}} type="password" />
      <InputPhone phone={''} onChange={() => {}} className={styles.inputPhone} />
      <Button className={styles.button} onClick={() => {}}>
        {localizeMessage('Create Account')}
      </Button>
      {/* <InputChecked handleChecked={() => {}} checked={true} /> */}
      {/* <LoginWithSocial /> */}
    </div>
  )
}

export default RegisterByPhone
