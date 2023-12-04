'use client'
import { useCallback, useEffect, useState } from 'react'
import GroupTitle from '../GroupTitle'
import Button from '@components/button'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'
import InputPrimary from '@components/input/InputPrimary'
import { BUTTON_TYPES } from '@constants/colors'
import useUpdateAccount from '@lib/account-information/useUpdateAccount'
import ButtonContainer from '../ButtonContainer'

const PrivateInformationSection = () => {
  const { localizeMessage } = useIntl()
  const [isEditInfoEnable, setIsEditInfoEnable] = useState(false)
  const {
    isSubmitSuccessfulUserName,
    firstname,
    lastname,
    errorsUserName,
    isLoading,
    onSubmit,
    handleSubmitUserName,
    resetUserName,
  } = useUpdateAccount()

  const handleToggleEditInfo = useCallback(() => {
    setIsEditInfoEnable((prev) => !prev)
  }, [isEditInfoEnable])

  useEffect(() => {
    if (isSubmitSuccessfulUserName) {
      setIsEditInfoEnable(false)
    }
  }, [isSubmitSuccessfulUserName])

  return (
    <form onSubmit={handleSubmitUserName(onSubmit)}>
      <GroupTitle title={localizeMessage('Private information')} onClick={handleToggleEditInfo} />
      <div className={styles.editContainer}>
        <InputPrimary
          message={errorsUserName.firstname?.message}
          name="firstname"
          ref={firstname.ref}
          onChange={firstname.onChange}
          onBlur={firstname.onBlur}
          placeholder={localizeMessage('First Name')}
          disabled={!isEditInfoEnable}
        />
        <InputPrimary
          message={errorsUserName.lastname?.message}
          name="lastname"
          ref={lastname.ref}
          onChange={lastname.onChange}
          onBlur={lastname.onBlur}
          placeholder={localizeMessage('Last Name')}
          disabled={!isEditInfoEnable}
        />
      </div>
      {isEditInfoEnable && (
        <div className={styles.buttonContainer}>
          <ButtonContainer
            onCancel={() => {
              handleToggleEditInfo()
              resetUserName()
            }}
            onSubmit={() => {}}
            disabled={!isEditInfoEnable || isLoading}
          />
        </div>
      )}
    </form>
  )
}

export default PrivateInformationSection
