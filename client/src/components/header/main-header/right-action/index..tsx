import { cloneDeep, map } from 'lodash'
import React, { Fragment, useMemo } from 'react'
import ActionItem from './ActionItem'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { ROUTER_PATHS } from '@constants/routerPaths'
import { RIGHT_HEADER_ACTIONS, TITLE_ACTIONS } from '@constants/home'

const RightActions = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)
  const renderView = useMemo(() => {
    const actionsList = cloneDeep(RIGHT_HEADER_ACTIONS)
    if (isSignedIn) {
      actionsList
    }
    const newData = actionsList.filter((item) => {
      if (isSignedIn) return item.title !== TITLE_ACTIONS.NO_LOGIN
      if (item.title === TITLE_ACTIONS.WISHLIST) {
        item.link = ROUTER_PATHS.LOGIN
      }
      return item.title !== TITLE_ACTIONS.ACCOUNT
    })
    return map(newData, (item) => (
      <Fragment key={item?.title}>
        <ActionItem item={item} />
      </Fragment>
    ))
  }, [isSignedIn])

  return <div className={styles.rightActions}>{renderView}</div>
}

export default RightActions
