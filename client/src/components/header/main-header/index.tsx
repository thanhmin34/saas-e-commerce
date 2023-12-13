'use client'
import styles from './styles.module.scss'

import HeaderLogo from './header-logo'
import RightActions from './right-action/index.'
import SearchBlock from './search-block'

const MainHeader = () => {
  function renderDesktopContent() {
    return (
      <div className={`${styles.desktopContent}`}>
        <HeaderLogo />
        <SearchBlock />
        <RightActions />
      </div>
    )
  }

  return <div className={`${styles.mainHeader}`}>{renderDesktopContent()}</div>
}

export default MainHeader
