'use client'
import React, { useMemo } from 'react'
import styles from './styles.module.scss'
import LanguageItem from './LanguageItem'
import { LANGUAGES } from '@constants/languages'
import { useParams } from 'next/navigation'

const Languages = ({ className }: { className?: string }) => {
  const { lang } = useParams()

  const languageItem = useMemo(() => {
    return lang === 'en' ? LANGUAGES[1] : LANGUAGES[0]
  }, [lang])

  return (
    <div className={`${styles.languagesContainer} ${className ? className : ''}`}>
      <LanguageItem languageItem={languageItem} />
    </div>
  )
}

export default Languages
