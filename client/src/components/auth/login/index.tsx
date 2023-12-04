'use client'
import React, { useState, useMemo } from 'react'
import useDetectDevice from '@hooks/useDetectDevice'
import { DEVICE } from '@constants/device'
import styles from './styles.module.scss'
import { SELECT_TAB_ID } from '@constants/login'
import TabPane from '../tab-pane'
import { ROUTER_PATHS } from '@constants/routerPaths'
import TitleBlock from '../title-block'
import TabPaneBlock from '../tab-pane-block'
import LoginPhoneNumber from '../login-phone-number'
import QuestionRegister from '../question-register'
import LoginByEmail from '../login-in-by-email'

const Login = () => {
  const { device } = useDetectDevice()
  const [showTabId, setShowTabId] = useState(SELECT_TAB_ID.TAB_LOGIN_PHONE)

  const title = useMemo(() => {
    return device === DEVICE.DESKTOP ? 'Sign In' : 'Welcome Back!'
  }, [device])

  const renderLogin = useMemo(() => {
    return showTabId === SELECT_TAB_ID.TAB_LOGIN_PHONE ? <LoginPhoneNumber /> : <LoginByEmail />
  }, [showTabId])

  const renderRightContent = (
    <div className={styles.login}>
      <div className={styles.tabPaneMobile}>
        <TabPane selectTabId={SELECT_TAB_ID.TAB_LOGIN_PHONE} navigate={ROUTER_PATHS.CREATE_ACCOUNT} />
      </div>
      <TitleBlock title={title} description="Please choose the most convenient way for you to Sign In." />
      <TabPaneBlock selectTabId={setShowTabId} showTabId={showTabId} navigate={ROUTER_PATHS.LOGIN} />
      {renderLogin}
    </div>
  )

  return (
    <div className={styles.rootPage}>
      {renderRightContent}
      <div className={styles.seperate}></div>
      <QuestionRegister
        description={
          'Creating an account has many benefits: check out faster, keep more than one address, track orders and more.'
        }
        title={'Don’t have an account?'}
        buttonText={'Create an account'}
        router={ROUTER_PATHS.CREATE_ACCOUNT}
      />
    </div>
  )
}

export default Login
