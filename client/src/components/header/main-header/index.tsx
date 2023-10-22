'use client'
import { useMemo } from 'react'
import { DEVICE } from '@constants/device'
import useDetectDevice from '@hooks/useDetectDevice'
import styles from './styles.module.scss'

import HeaderLogo from './header-logo'
import RightActions from './right-action/index.'
import SearchBlock from './search-block'

const MainHeader = () => {
  const { device } = useDetectDevice()

  const content = useMemo(() => {
    switch (device) {
      case DEVICE.DESKTOP:
        return renderDesktopContent()
      default:
        return <></>
    }
  }, [device])

  function renderDesktopContent() {
    return (
      <div className={`${styles.desktopContent}`}>
        <HeaderLogo />
        <SearchBlock />
        <RightActions />
      </div>
    )
  }

  return <div className={`${styles.mainHeader}`}>{content}</div>
}

export default MainHeader
