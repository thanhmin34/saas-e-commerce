import React from 'react'
import styles from './styles.module.scss'
import InformationFooter from './information-footer/InformationFooter'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`main-container ${styles.footerContainer}`}>
        <InformationFooter />
      </div>
    </footer>
  )
}

export default Footer
