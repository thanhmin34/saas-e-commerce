import React from 'react'
import Image from 'next/legacy/image'
import { useSelector } from 'react-redux'

import { RootState } from '@redux/reducers'
import useDetectDevice from '@hooks/useDetectDevice'
import { IUserInfo } from '@interfaces/redux/userInfo'

import styles from './styles.module.scss'
import { DEVICE } from '@constants/device'
import { imageUrls } from '@constants/imageUrls'
import { SIZE_ICON } from '@constants/variables'
import PrivateInformationSection from './information-section/PrivateInformationSection'
import GenderAndBirthdaySection from './gender-and-birthday-section'
import ContactSection from './contact-information-section'

const MyProfileInfo = () => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const { firstname = '', lastname = '', email = '' } = userInfo as IUserInfo
  const fullName = `${firstname} ${lastname}`

  const { device } = useDetectDevice()

  return (
    <div className={styles.myProfileInfo}>
      {device === DEVICE.DESKTOP && (
        <div className={styles.myProfileInfoTitle}>
          <div>
            <Image
              src={imageUrls.iconAccountInfo}
              width={SIZE_ICON.WIDTH_DEFAULT}
              height={SIZE_ICON.HEIGHT_DEFAULT}
              alt="myaccount-profile"
              priority
            />
          </div>
          <div className={styles.userProfileInfo}>
            <div className={styles.fullName}>{fullName}</div>
            <div className={styles.email}>{email}</div>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <PrivateInformationSection />
        <GenderAndBirthdaySection />
        <ContactSection />
      </div>
    </div>
  )
}

export default MyProfileInfo
