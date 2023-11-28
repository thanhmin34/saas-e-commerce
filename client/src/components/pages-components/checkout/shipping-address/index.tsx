'use client'
import React from 'react'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'
import { DEFAULT_VALUE } from '@constants/map'
import CheckoutAWSMap from '../aws-map/AWSMaps'
import Button from '@components/button'

const CheckoutShippingAddress = () => {
  const { localizeMessage } = useIntl()
  const addressData = {
    firstname: 'hoang',
    lastname: 'min',
    phoneNumber: '9973789802',
    address: '',
    district: 'hue',
    city: '',
    country: '',
    postCode: '',
  }
  const {
    firstname = '',
    lastname = '',
    phoneNumber = '',
    address = '',
    district = '',
    city = '',
    country = '',
    postCode = '',
  } = addressData || {}

  const currentAddress = { tempLatLng: DEFAULT_VALUE }

  const dataAddress = [
    {
      name: `${address}`,
      id: 2,
    },
    {
      name: `${district}, ${city}`,
      id: 3,
    },
    {
      name: `${country}, ${postCode}`,
      id: 4,
    },
    {
      name: phoneNumber,
      id: 5,
    },
  ]

  const handleSaveAddress = () => {}

  return (
    <div className={styles.shippingAddress}>
      <h3 className={styles.title}>{localizeMessage('2. Shipping Address & Method')}</h3>
      <span className={styles.description}>{localizeMessage('Add your information for complete identification')}</span>
      <CheckoutAWSMap currentAddress={currentAddress} />
      <div className={styles.addressInfo}>
        <div>addressInfo</div>
        <Button onClick={handleSaveAddress}>{localizeMessage('2. Shipping Address & Method')}</Button>
      </div>
    </div>
  )
}

export default CheckoutShippingAddress
