'use client'
import React, { Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { RootState } from '@redux/reducers'
import { TAMARA_WIDGET_CONFIG } from '@constants/variables'
import useLoadScriptsTamara from '@hooks/useLoadScriptsTamara'

//TODO: Should update tamara public key
const TamaraWidgetButton = ({ finalPrice }: { finalPrice: number }) => {
  const { currency } = useSelector((state: RootState) => state.configApp)

  const isShowTamara = () => {
    if (!currency || !finalPrice) {
      return false
    }
    return (
      finalPrice &&
      TAMARA_WIDGET_CONFIG.MIN_PRICE &&
      TAMARA_WIDGET_CONFIG.MAX_PRICE &&
      finalPrice <= TAMARA_WIDGET_CONFIG.MAX_PRICE &&
      finalPrice >= TAMARA_WIDGET_CONFIG.MIN_PRICE
    )
  }

  useLoadScriptsTamara({ price: finalPrice, isShowTamara: !!isShowTamara(), currency })

  return (
    <div className={styles.tamaraProductWidgetContainer}>
      <div className="tamara-product-widget"></div>
    </div>
  )
}

export default TamaraWidgetButton
