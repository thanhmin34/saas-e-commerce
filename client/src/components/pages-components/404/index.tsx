'use client'
import React from 'react'

//styles
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import Image from 'next/legacy/image'
import { imageUrls } from '@constants/imageUrls'
import useIntl from '@hooks/useIntl'
import Button from '@components/button'
import { BUTTON_TYPES } from '@constants/colors'
import { ROUTER_PATHS } from '@constants/routerPaths'

const ErrorPage = () => {
  const { push, back } = useRouter()
  const { localizeMessage } = useIntl()

  const imageBlock = (
    <div className={styles.errorBackground}>
      <Image
        className={styles.errorBackgroundImg}
        src={imageUrls.errorBackground}
        layout="fill"
        alt="error-image"
        priority
      />
    </div>
  )

  const content = (
    <div className={styles.content}>
      <h3 className={styles.title}>{localizeMessage("The page you're looking for does not exist")}</h3>
      <div className={styles.description}>
        {localizeMessage(
          'The page you requested was not found, and we have a fine guess why. If you typed the URL directly, please make sure the spelling is correct. If you clicked on a link to get here, the link is outdated.'
        )}
      </div>
      <div className={styles.wrapperButton}>
        <Button
          className={styles.goToHomeBtn}
          buttonType={BUTTON_TYPES.OUTLINE}
          onClick={() => push(ROUTER_PATHS.HOME)}
        >
          {localizeMessage('Take me Home')}
        </Button>
        <Button className={styles.goBackBtn} buttonType={BUTTON_TYPES.PRIMARY} onClick={() => back()}>
          {localizeMessage('Go back')}
        </Button>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      {imageBlock}
      {content}
    </div>
  )
}

export default ErrorPage
