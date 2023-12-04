'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'
import { DEFAULT_VALUE } from '@constants/map'
// import CheckoutAWSMap from '../aws-map/AWSMaps'
import Button from '@components/button'
import { IPlace, IRecipientInfo, IShippingAddress } from '@interfaces/checkout'
import { cloneDeep } from 'lodash'
import ModalRecipientInfo from '../modal-recipient-info'
import { IShippingAddressCart } from '@interfaces/redux/cart'
import { DEFAULT_SHIPPING_ADDRESS } from '@constants/checkout'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { IUserInfo } from '@interfaces/redux/userInfo'
import CheckoutAWSMap from '../aws-map/AWSMaps'

interface IShippingAddressProps {
  onAddShippingAddress: (address: IShippingAddress) => void
  shippingAddress: IShippingAddressCart | null
}
const CheckoutShippingAddress = (props: IShippingAddressProps) => {
  const { onAddShippingAddress, shippingAddress } = props || {}
  const { localizeMessage } = useIntl()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const [addressValues, setAddressValues] = useState<IShippingAddress>(DEFAULT_SHIPPING_ADDRESS)

  const { firstname, lastname, phone, label } = addressValues || {}

  const handleToggleModal = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [isOpen])

  const onChangeAddress = (data: IPlace | IRecipientInfo) => {
    setAddressValues((prevData) => {
      const newData = cloneDeep(prevData)
      return { ...newData, ...data }
    })
  }

  const handleSaveAddress = useCallback(() => {
    onAddShippingAddress({ ...addressValues, phone: addressValues.phone })
  }, [addressValues])

  const fullName = `${lastname} ${firstname}`
  const currentAddress = { tempLatLng: addressValues?.tempLatLng || DEFAULT_VALUE }
  useEffect(() => {
    if (shippingAddress) {
      const {
        country,
        city,
        email,
        street,
        post_code,
        phone,
        tempLatLng,
        address_number,
        firstname,
        lastname,
        label,
        region,
      } = shippingAddress || {}

      const newValues = {
        firstname,
        lastname,
        address_number,
        post_code,
        region,
        country,
        city,
        email,
        street,
        phone,
        tempLatLng,
        label,
      }
      setAddressValues(newValues)
    } else if (userInfo) {
      const { firstname, lastname, phone_number = '', email } = userInfo as IUserInfo
      setAddressValues((prevData) => {
        const newData = cloneDeep(prevData)
        const params = { ...newData, firstname, lastname, phone: phone_number || '', email: email || '' }
        return params
      })
    }
  }, [shippingAddress, userInfo])

  return (
    <div className={styles.shippingAddress}>
      <h3 className={styles.title}>{localizeMessage('2. Shipping Address & Method')}</h3>
      <span className={styles.description}>{localizeMessage('Add your information for complete identification')}</span>
      <CheckoutAWSMap onChangeAddress={onChangeAddress} currentAddress={currentAddress} />
      <div className={styles.addressInfo}>
        {label && <div className={styles.label}>{`${localizeMessage('Recipient Full Name:')} ${label}`}</div>}
        <div className={styles.fullName}>{`${localizeMessage('Recipient Full Name:')} ${fullName}`}</div>
        <div className={styles.phoneNumber}>{`${localizeMessage('Recipient Phone Number:')} ${
          addressValues?.phone
        }`}</div>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleToggleModal}>{localizeMessage('Edit Recipient')}</Button>
        <Button onClick={handleSaveAddress}>{localizeMessage('Save Address')}</Button>
      </div>
      {isOpen && (
        <ModalRecipientInfo
          onChangeAddress={onChangeAddress}
          currentUser={{ firstname, lastname, phone }}
          isOpen={isOpen}
          handleClose={handleToggleModal}
        />
      )}
    </div>
  )
}

export default CheckoutShippingAddress
