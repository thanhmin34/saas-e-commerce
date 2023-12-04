'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Model from '@components/model/Model'
import styles from './styles.module.scss'
import InputPhone from '@components/input-phone'
import InputPrimary from '@components/input/InputPrimary'
import useIntl from '@hooks/useIntl'
import { cloneDeep } from 'lodash'
import Button from '@components/button'
import { IPlace, IRecipientInfo } from '@interfaces/checkout'
interface Props {
  handleClose: () => void
  isOpen: boolean
  onChangeAddress: (data: IPlace | IRecipientInfo) => void
  currentUser: IRecipientInfo
}

const ModalRecipientInfo = (props: Props) => {
  const { isOpen, handleClose, onChangeAddress, currentUser } = props || {}
  const { localizeMessage } = useIntl()
  const [values, setValues] = useState<IRecipientInfo>({
    firstname: '',
    lastname: '',
    phone: '',
  })
  const { firstname, lastname, phone } = values || {}

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setValues((prevData) => {
      const newData: IRecipientInfo = cloneDeep(prevData)
      newData[name as keyof IRecipientInfo] = value
      return newData
    })
  }

  const onSaveRecipientInfo = () => {
    onChangeAddress(values)
    handleClose()
  }
  useEffect(() => {
    if (currentUser) {
      setValues(currentUser)
    }
  }, [])

  return (
    <Model className={styles.modalBlock} isOpen={isOpen} handleClose={handleClose}>
      <div className={styles.recipientInfo}>
        <InputPrimary
          value={firstname}
          placeholder={localizeMessage('First name')}
          name={'firstname'}
          onChange={onChangeInput}
        />
        <InputPrimary
          value={lastname}
          placeholder={localizeMessage('Last name')}
          name={'lastname'}
          onChange={onChangeInput}
        />
        <InputPhone name={'phone'} phone={values?.phone} onChange={onChangeInput} />
        <Button
          disabled={!firstname || !lastname || !phone}
          onClick={onSaveRecipientInfo}
          className={styles.buttonSubmit}
        >
          {localizeMessage('Save Recipient')}
        </Button>
      </div>
    </Model>
  )
}

export default ModalRecipientInfo
