import { DEVICE } from '@constants/device'
import useDetectDevice from '@hooks/useDetectDevice'

import styles from './styles.module.scss'

import InformationAddress from './InformationAddress'
import Languages from '../languages'

const TopBar = () => {
  const { device } = useDetectDevice()

  return (
    <div className={`${styles.topBarMenu}`}>
      <div className={`main-container ${styles.topBarContent}`}>
        <InformationAddress />
        <Languages />
      </div>
    </div>
  )
}

export default TopBar
