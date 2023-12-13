'use client'
import { map } from 'lodash'
import React, { Fragment } from 'react'
import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import { IShippingAddress } from '@interfaces/checkout'
import { IAddressInfo } from '@interfaces/user'
import LineInfo from './LineInfo'

const ShippingAddress = (props: { shippingAddress: IShippingAddress }) => {
  const { localizeMessage } = useIntl()
  const { shippingAddress } = props || {}
  const { firstname = '', lastname = '', phone = '', label } = shippingAddress || {}

  const dataInfoAddress: IAddressInfo[] = [
    {
      icon: <PersonIcon width={20} />,
      title: localizeMessage('Customer Name'),
      value: `${lastname} ${firstname}`,
    },
    {
      icon: <LocationOnIcon width={20} />,
      title: localizeMessage('Address'),
      value: label,
    },
    {
      icon: <PhoneAndroidIcon width={20} />,
      title: localizeMessage('Phone Number'),
      value: phone,
    },
  ]

  return (
    <div className={styles.infoView}>
      <div className={styles.headerTitle}>
        <h4 className={styles.subTitleBlock}>{localizeMessage('Shipping Address')}</h4>
      </div>
      <div className={styles.block}>
        {map(dataInfoAddress, (item, key) => (
          <LineInfo key={key} item={item} />
        ))}
      </div>
    </div>
  )
}

export default ShippingAddress
