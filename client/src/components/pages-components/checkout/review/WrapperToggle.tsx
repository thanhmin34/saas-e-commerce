'use client'
import React, { useState, ReactNode } from 'react'

import styles from './styles.module.scss'
import useIntl from '@hooks/useIntl'
import AddIcon from '@mui/icons-material/Add'
import { Remove } from '@mui/icons-material'

type Props = {
  children: ReactNode
  title: string
}

const WrapperToggle = (props: Props) => {
  const { children, title } = props || {}
  const { localizeMessage } = useIntl()
  const [isShow, setIsShow] = useState(false)
  const handleToggle = () => {
    setIsShow((prev) => !prev)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <div className={styles.title}>{localizeMessage(title)}</div>
        <div onClick={handleToggle} className={styles.button}>
          {!isShow ? <AddIcon width={16} /> : <Remove width={16} />}
        </div>
      </div>

      {isShow && children}
    </div>
  )
}

export default WrapperToggle
