'use client'
import { useSelector } from 'react-redux'
import React, { Fragment, useMemo } from 'react'
import { RootState } from '@redux/reducers'
import { TABBY_WIDGET_CONFIG } from '@constants/variables'
import styles from './styles.module.scss'
import useLoadScriptsTabby from '@hooks/useLoadScriptsTabby'

const TabbyWidgetButton = ({ finalPrice }: { finalPrice: number }) => {
  const { currency } = useSelector((state: RootState) => state.configApp)

  const isShowTabby = () => {
    if (!currency || !finalPrice) {
      return false
    }
    return (
      finalPrice &&
      TABBY_WIDGET_CONFIG.MIN_PRICE &&
      TABBY_WIDGET_CONFIG.MAX_PRICE &&
      finalPrice <= TABBY_WIDGET_CONFIG.MAX_PRICE &&
      finalPrice >= TABBY_WIDGET_CONFIG.MIN_PRICE
    )
  }

  useLoadScriptsTabby({ price: finalPrice, isShowTabby: !!isShowTabby(), currency })

  return (
    <div className={styles.tabbyPromo}>
      <div id="idTabby" />
    </div>
  )
}

export default TabbyWidgetButton
