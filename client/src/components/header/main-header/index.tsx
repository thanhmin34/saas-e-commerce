'use client'
import styles from './styles.module.scss'

import HeaderLogo from './header-logo'
import RightActions from './right-action/index.'
import SearchBlock from './search-block'
import MobileActions from './mobile-actions'

const MainHeader = () => {
  function renderDesktopContent() {
    return (
      <div className={`${styles.desktopContent}`}>
        <MobileActions />
        <HeaderLogo />
        <SearchBlock />
        <RightActions />
      </div>
    )
  }

  return <div className={`${styles.mainHeader}`}>{renderDesktopContent()}</div>
}

export default MainHeader
