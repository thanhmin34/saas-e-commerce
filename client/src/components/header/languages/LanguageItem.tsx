'use client'
import Image from 'next/image'
import React, { useCallback } from 'react'
import styles from './styles.module.scss'
import { Languages } from '@interfaces/languages'
import { useParams, useRouter } from 'next/navigation'
import { HOST } from '@utils/runtimeEnvironment'

interface LanguageItem {
  languageItem: Languages
}

const LanguageItem = ({ languageItem }: LanguageItem) => {
  const { language, icon, alt, code } = languageItem
  const { push } = useRouter()
  const { lang } = useParams()

  const onChangeLanguage = useCallback(() => {
    const language = lang === 'en' ? 'vn' : 'en'
    push(`/${language}`)
  }, [lang])

  return (
    <div onClick={onChangeLanguage} className={styles.language}>
      <span>{language}</span>
      <Image className={styles.image} src={icon} width={18.5} height={18.5} alt={alt} />
    </div>
  )
}

export default LanguageItem
