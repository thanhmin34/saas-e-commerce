'use client'
import { useEffect } from 'react'
import { loadScripts } from '@utils/helper'
import { ITamaraProductWidget } from '@interfaces/global'

interface IPropsLoadScripts {
  price: number
  isShowTamara: boolean
  currency: string
}

const useLoadScriptsTamara = ({ price, currency, isShowTamara }: IPropsLoadScripts) => {
  useEffect(() => {
    loadScripts('tamara-widget', 'https://cdn.tamara.co/widget/product-widget.min.js')
  }, [])

  if (typeof window != 'undefined' && isShowTamara) {
    // Validate the script is already loaded
    // The init method is optional. You can ignore this one and pass value as attributes (In next step)
    if ('TamaraProductWidget' in window) {
      const tamaraWidget = window.TamaraProductWidget as ITamaraProductWidget
      tamaraWidget.init({
        lang: 'en',
        currency: 'SAR' || currency,
        price: price || 0,
      })
      tamaraWidget.render()
    }
  }
}

export default useLoadScriptsTamara
