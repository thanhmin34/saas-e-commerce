import Link from 'next/link'
import React, { Fragment } from 'react'
//Constants & Helpers
import { DEVICE } from '@constants/device'

import styles from './styles.module.scss'
import useDetectDevice from '@hooks/useDetectDevice'
import { ROUTER_PATHS } from '@constants/routerPaths'

export default function HeaderLogo() {
  const { device } = useDetectDevice()

  const urlLogo = 'https://media.9ten.cloud/media/logo/stores/15/header-logo-en_1_4.png'

  if (urlLogo) {
    return (
      <Link className={`${styles.headerLogo}`} href={ROUTER_PATHS.HOME}>
        <div className={`${device === DEVICE.DESKTOP ? styles.logoImage : styles.logoImageMobile}`}>
          <img loading="eager" src={urlLogo} alt="logo" />
        </div>
      </Link>
    )
  }

  return <Fragment />
}
