'use client'
import { get } from 'lodash'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { RootState } from '@redux/reducers'
import useIntl from '@hooks/useIntl'
import { Fragment, useCallback, useEffect, useState } from 'react'
import GroupTitle from '../GroupTitle'
import InputPhone from '@components/input-phone'
import InputPrimary from '@components/input/InputPrimary'
import ButtonContainer from '../ButtonContainer'
import useUpdateAccount from '@lib/account-information/useUpdateAccount'

const ContactSection = () => {
  const { localizeMessage } = useIntl()
  const {
    email,
    errorsUserContact,
    isSubmitSuccessfulContact,
    handleSubmitUserContact,
    onSubmit,
    phone_number,
    resetUserContact,
  } = useUpdateAccount()
  const [isEdit, setIsEdit] = useState(false)

  const handleToggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev)
  }, [isEdit])

  useEffect(() => {
    if (isSubmitSuccessfulContact) {
      setIsEdit(false)
    }
  }, [isSubmitSuccessfulContact])

  return (
    <form onSubmit={handleSubmitUserContact(onSubmit)}>
      <GroupTitle isDisabled={false} title={localizeMessage('Contact')} onClick={handleToggleEdit} />
      <div className={styles.editContainer}>
        <InputPhone
          message={errorsUserContact?.phone_number?.message}
          name="phone"
          className={styles.inputElement}
          disabled={!isEdit}
          paramsRef={phone_number}
        />
        <InputPrimary
          disabled={!isEdit}
          className={styles.inputElement}
          placeholder={localizeMessage('Email')}
          name="email"
          ref={email.ref}
          onChange={email.onChange}
          onBlur={email.onBlur}
          message={errorsUserContact?.email?.message}
        />
      </div>
      {isEdit && (
        <ButtonContainer
          onCancel={() => {
            handleToggleEdit()
            resetUserContact()
          }}
          onSubmit={() => {}}
          disabled={!isEdit}
        />
      )}
    </form>
  )
}

export default ContactSection
