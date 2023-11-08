import React from 'react'

import styles from './styles.module.scss'
import { imageUrls } from '@constants/imageUrls'
import useIntl from '@hooks/useIntl'
import Image from 'next/image'

interface IProps {
  showToggle: boolean
  toggleSidebar: () => void
}
const FilterHeader = ({ toggleSidebar, showToggle }: IProps) => {
  const { localizeMessage } = useIntl()
  return (
    <div className={styles.filterHeader}>
      <h2>{localizeMessage('Filters')}</h2>
      {showToggle && (
        <button className="button--transparent p-0" onClick={toggleSidebar} aria-label="toggle-side-bar">
          <Image src={imageUrls.iconSort} width={24} height={24} alt="icon-exit" />
        </button>
      )}
    </div>
  )
}

export default FilterHeader
