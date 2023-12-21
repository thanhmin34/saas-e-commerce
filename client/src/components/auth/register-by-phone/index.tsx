import React from 'react'

// styles
import styles from './styles.module.scss'

// components

import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import InputPhone from '@components/input-phone'
import InputPrimary from '@components/input/InputPrimary'
import useRegisterByPhone from '@lib/auth/useRegisterByPhone'
import Loading from '@components/loading'

const RegisterByPhone = () => {
  const { localizeMessage } = useIntl()
  const { firstName, lastName, phone, isLoading, errors, handleSubmit, onSubmit } = useRegisterByPhone()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginPhoneNumber}>
      <h3 className={styles.subTitle}>{localizeMessage('Add your mobile number below to make registration.')}</h3>
      <InputPrimary
        message={errors.firstName?.message}
        name="firstName"
        placeholder={localizeMessage('First name')}
        ref={firstName.ref}
        onChange={firstName.onChange}
        onBlur={firstName.onBlur}
      />
      <InputPrimary
        message={errors.lastName?.message}
        name="lastName"
        ref={lastName.ref}
        onChange={lastName.onChange}
        onBlur={lastName.onBlur}
        placeholder={localizeMessage('Last name')}
      />
      <InputPhone name="phone" paramsRef={phone} className={styles.inputPhone} />
      <Button className={styles.button} type="submit">
        {localizeMessage('Create Account')}
      </Button>
      {/* <InputChecked handleChecked={() => {}} checked={true} /> */}
      {/* <LoginWithSocial /> */}
      {isLoading && <Loading />}
    </form>
  )
}

export default RegisterByPhone
