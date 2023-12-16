'use client'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import ErrorPage from '@components/pages-components/404'

const NotFound = () => {
  return <div className={styles.mainPage}>{<ErrorPage />}</div>
}

export default dynamic(() => Promise.resolve(NotFound))
