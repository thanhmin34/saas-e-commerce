'use client'
import React from 'react'
import { map } from 'lodash'
import styles from './styles.module.scss'
import { IMyAddressList } from '@interfaces/user'
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import AddressCard from '../address-card'
import { VIEW_CONTENT_ADDRESS } from '@constants/account'

type Props = {
  addressData: IMyAddressList
  onDeleteAddress: (id: number) => void
  onChangeView: (view: string) => void
}

const AddressList = (props: Props) => {
  const { addressData, onDeleteAddress, onChangeView } = props || {}
  const { address } = addressData || {}
  const { localizeMessage } = useIntl()

  const renderAddressList = () => {
    return (
      <div className={styles.addressContainer}>
        {address?.length === 0 && (
          <div className={styles.noAddress}>{localizeMessage('There’re no saved addresses to view')}</div>
        )}
        <div className={styles.addressContent}>
          {map(address, (item, index) => (
            <AddressCard index={+index} address={item} onDeleteClick={onDeleteAddress} key={index} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className={styles.addressList}>
      <div className={styles.header}>
        <h1>{localizeMessage('Addresses List')}</h1>
        <Button onClick={() => onChangeView(VIEW_CONTENT_ADDRESS.CREATE_ADDRESS)} className={styles.buttonAddress}>
          {localizeMessage('Add New Address')}
        </Button>
      </div>
      {renderAddressList()}
    </div>
  )
}

export default AddressList
