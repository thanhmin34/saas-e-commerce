import React from 'react'
// styles
import styles from './styles.module.scss'

// components
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import Loading from '@components/loading'
import InputPrimary from '@components/input/InputPrimary'
import useRegisterByEmail from '@lib/auth/useRegisterEmail'

const RegisterByEmail = () => {
  const { localizeMessage } = useIntl()
  const { onSubmit, handleSubmit, error, isLoading, firstName, lastName, email, password, errors } =
    useRegisterByEmail()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginPhoneNumber}>
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
      <InputPrimary
        message={errors.email?.message}
        name="email"
        ref={email.ref}
        onChange={email.onChange}
        onBlur={email.onBlur}
        placeholder={localizeMessage('Email')}
      />
      <InputPrimary
        message={errors.password?.message}
        name="password"
        type="password"
        ref={password.ref}
        onChange={password.onChange}
        onBlur={password.onBlur}
        placeholder={localizeMessage('Password')}
      />

      <Button disabled={isLoading} className={styles.button} onClick={() => {}}>
        {localizeMessage('Create Account')}
      </Button>
      {isLoading && <Loading />}
    </form>
  )
}

export default RegisterByEmail
