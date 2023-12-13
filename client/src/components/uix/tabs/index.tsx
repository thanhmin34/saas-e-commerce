'use client'
import React, { Fragment, ReactNode, useState } from 'react'
import styles from './styles.module.scss'
type Props = {
  title: string
  children: ReactNode
}

const Tabs = (props: Props) => {
  const { title, children } = props
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <Fragment>
      <button className={`${styles.button} ${isShow && styles.isActive}`} onClick={() => setIsShow((prev) => !prev)}>
        {title}
      </button>
      {isShow && children}
    </Fragment>
  )
}

export default Tabs
