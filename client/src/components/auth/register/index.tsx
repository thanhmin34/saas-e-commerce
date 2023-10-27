'use client'
import { SELECT_TAB_ID } from '@constants/login'
import React, { useState, useMemo, Fragment } from 'react'
import styles from './styles.module.scss'
import TabPane from '../tab-pane'
import { ROUTER_PATHS } from '@constants/routerPaths'
import TitleBlock from '../title-block'
import TabPaneBlock from '../tab-pane-block'

import QuestionRegister from '../question-register'
import RegisterByPhone from '../register-by-phone'
import RegisterByEmail from '../register-by-email'

const RegisterAccount = () => {
  const [showTabId, setShowTabId] = useState(SELECT_TAB_ID.TAB_LOGIN_PHONE)

  const renderLogin = useMemo(() => {
    return showTabId === SELECT_TAB_ID.TAB_LOGIN_PHONE ? <RegisterByPhone /> : <RegisterByEmail />
  }, [showTabId])

  const renderDescription =
    showTabId === SELECT_TAB_ID.TAB_LOGIN_PHONE
      ? 'Creating an account has many benefits: check out faster, keep more than one address, track orders and more.'
      : 'Please choose the most convenient way for you to Sign In.'

  const renderRightContent = (
    <div className={styles.login}>
      <div className={styles.tabPaneMobile}>
        <TabPane selectTabId={SELECT_TAB_ID.TAB_REGISTER} navigate={ROUTER_PATHS.LOGIN} />
      </div>
      <TitleBlock title={'Create an Account'} description={renderDescription} />
      <TabPaneBlock selectTabId={setShowTabId} showTabId={showTabId} navigate={ROUTER_PATHS.LOGIN} />
      {renderLogin}
    </div>
  )
  return (
    <Fragment>
      <div className={styles.rootPage}>
        {renderRightContent}
        <div className={styles.seperate}></div>
        <QuestionRegister
          description={'Add your information for complete identification'}
          title={'Do you have an account?'}
          buttonText={'Sign In'}
          router={ROUTER_PATHS.LOGIN}
        />
      </div>
    </Fragment>
  )
}

export default RegisterAccount
