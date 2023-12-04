import React from 'react'
import useIntl from '@hooks/useIntl'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import styles from './styles.module.scss'
import { IUserInfo } from '@interfaces/redux/userInfo'

const InformationUser = () => {
  const { localizeMessage } = useIntl()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const userInfoData = userInfo as IUserInfo
  const { firstname = '', lastname = '', phone_number = '' } = userInfoData

  const fullName = `${lastname} ${firstname}`
  return (
    <div className={styles.checkoutInfo}>
      <div className={styles.title}>{localizeMessage('1. Sign In')}</div>
      <div className={styles.phone}>
        <div className={styles.fullName}>{fullName}</div>
        <div>{phone_number}</div>
      </div>
    </div>
  )
}
export default InformationUser
