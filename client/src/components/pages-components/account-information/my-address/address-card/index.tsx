import { map } from 'lodash'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { IMyAddressItem } from '@interfaces/user'
import useIntl from '@hooks/useIntl'
import { SIZE_ICON } from '@constants/variables'
import Model from '@components/model/Model'
import Button from '@components/button'
import { BUTTON_TYPES } from '@constants/colors'
import DeleteIcon from '@mui/icons-material/Delete'

interface IAddressItemProps {
  index: number
  address: IMyAddressItem
  onDeleteClick: (id: number) => void
}
export default function AddressCard({ index, address, onDeleteClick }: IAddressItemProps) {
  const { address_number, label, city, post_code, region = '', street = '', id, country } = address

  const [modalShowed, setModalShowed] = useState(false)

  const { localizeMessage } = useIntl()

  const onHideModal = () => {
    setModalShowed(false)
  }

  const onDeleteAddress = () => {
    onDeleteClick(id)
    onHideModal()
  }

  const renderDeleteButton = () => {
    return (
      <button className={`${styles.editButton}`} onClick={() => setModalShowed(true)}>
        <DeleteIcon width={SIZE_ICON.WIDTH_DEFAULT} />
      </button>
    )
  }

  const modalDeleteAddress = () => {
    return (
      <Model className={styles.modalDeleteAddress} isOpen={modalShowed} handleClose={onHideModal}>
        <div className={styles.titleModal}>{localizeMessage('Address will be deleted')}</div>
        <div className={styles.subTitleModal}>
          {localizeMessage('The address will be deleted, do you want to proceed ?')}
        </div>
        <div className={styles.buttonGroup}>
          <Button
            buttonType={BUTTON_TYPES.OUTLINE}
            onClick={onHideModal}
            className={`${styles.buttonChangeView} ${styles.outline}`}
          >
            <span className={styles.text}>{localizeMessage('No')}</span>
          </Button>
          <Button onClick={onDeleteAddress} className={styles.buttonChangeView}>
            {localizeMessage('Yes')}
          </Button>
        </div>
      </Model>
    )
  }

  const renderAddressCard = () => {
    const data = [
      {
        name: 'Building Number',
        value: address_number,
      },
      {
        name: 'Street',
        value: street,
      },
      {
        name: 'District',
        value: region,
      },
      {
        name: 'City',
        value: city,
      },
      {
        name: 'State/province/area',
        value: city,
      },
      {
        name: 'ZIP/Postal Code',
        value: post_code,
      },
      {
        name: 'Country',
        value: country,
      },
    ]
    return (
      <div className={styles.addressCard}>
        <div className={styles.title}>
          {localizeMessage('Address')} {index + 1}
        </div>
        {map(data, (item, index) => {
          return (
            <div key={index} className={styles.customerAddressItem}>
              <span>{localizeMessage(item.name)}</span>
              <p>{item.value || ''}</p>
            </div>
          )
        })}

        {renderDeleteButton()}
        {modalDeleteAddress()}
      </div>
    )
  }

  return <>{renderAddressCard()}</>
}
