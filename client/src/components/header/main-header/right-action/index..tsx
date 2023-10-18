import { RIGHT_HEADER_ACTIONS } from '@constants/home'
import React, { Fragment } from 'react'
import ActionItem from './ActionItem'
import styles from './styles.module.scss'
type Props = {}

const RightActions = (props: Props) => {
  const content = RIGHT_HEADER_ACTIONS.map((item) => (
    <Fragment key={item?.title}>
      <ActionItem item={item} />
    </Fragment>
  ))
  return <div className={styles.rightActions}>{content}</div>
}

export default RightActions
