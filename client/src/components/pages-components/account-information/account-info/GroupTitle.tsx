import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/legacy/image'
import { SIZE_ICON } from '@constants/variables'
import { imageUrls } from '@constants/imageUrls'

interface IGroupTitleParams {
  title: string
  isDisabled?: boolean
  onClick: () => void
}
const GroupTitle = ({ title, isDisabled, onClick }: IGroupTitleParams) => {
  return (
    <div className={styles.groupTitle}>
      <span className={styles.titleHeading}>{title}</span>
      <button type="button" className={styles.editButton} disabled={!!isDisabled} onClick={onClick}>
        <Image src={imageUrls.iconEdit} alt="icon-edit" width={SIZE_ICON.WIDTH_SMALL} height={SIZE_ICON.HEIGHT_SMALL} />
        <span className={styles.editButtonContent}>{/* <LocalizeMessage id="Edit" /> */}</span>
      </button>
    </div>
  )
}

export default GroupTitle
