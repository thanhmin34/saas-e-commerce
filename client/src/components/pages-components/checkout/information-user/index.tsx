import React from 'react'
import Image from 'next/image'
import useIntl from '@hooks/useIntl'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import styles from './styles.module.scss'

const InformationUser = () => {
  const { localizeMessage } = useIntl()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const {} = userInfo || {}
  const { national_flags_image: flagImage } = useSelector((state: RootState) => state.configApp)

  //   const { customer_mobile = '' } = currentUser || {}
  //   const { national_flags_image: imgCountry } = storeConfig || {}

  return (
    <div className={styles.checkoutInfo}>
      <div className={styles.title}>{localizeMessage('1. Sign In')}</div>
      <div className={styles.phone}>
        {flagImage && <Image src={flagImage} alt="logo-phone-thumb" width={32} height={20} />}

        <div>{`${90000000}`}</div>
      </div>
    </div>
  )
}
export default InformationUser
