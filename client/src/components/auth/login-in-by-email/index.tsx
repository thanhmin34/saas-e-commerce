import React from 'react'
import Link from 'next/link'

// styles
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import { ROUTER_PATHS } from '@constants/routerPaths'
import InputPrimary from '@components/input/InputPrimary'
import useLoginByEmail from '@lib/auth/useLoginByEmail'
import LocalStorageManager from '@utils/simplePersistence'

const LoginByEmail = () => {
  const { localizeMessage } = useIntl()
  const errorMessageEmail = ''
  const { onSubmit, handleSubmit, email, password, errors, isLoading } = useLoginByEmail()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpByEmail}>
      <h3 className={styles.subTitle}>{localizeMessage('To sign in, add your email and password below.')}</h3>
      {!!errorMessageEmail && (
        <div className={styles.errorMessage}>
          <span>{localizeMessage(errorMessageEmail)}</span>
        </div>
      )}
      <InputPrimary
        placeholder={localizeMessage('Email address')}
        name={email.name}
        ref={email.ref}
        onChange={email.onChange}
        onBlur={email.onBlur}
      />
      <InputPrimary
        placeholder={localizeMessage('Password')}
        ref={password.ref}
        onChange={password.onChange}
        onBlur={password.onBlur}
        name={password.name}
        type="password"
      />

      <div className={styles.forgotPassword}>
        <Link href={ROUTER_PATHS.FORGOT_PASSWORD}>{localizeMessage('Forgot your password?')}</Link>
      </div>
      <Button className={styles.button} disabled={isLoading}>
        {localizeMessage('Sign In')}
      </Button>
    </form>
  )
}

export default LoginByEmail
