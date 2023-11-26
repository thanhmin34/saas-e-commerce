'use client'
import { useEffect } from 'react'
import { loadScripts } from '@utils/helper'
import { ITabbyPromo } from '@interfaces/global'

interface IPropsLoadScripts {
  price: number
  isShowTabby: boolean
  currency: string
}

const useLoadScriptsTabby = ({ price, isShowTabby, currency }: IPropsLoadScripts) => {
  useEffect(() => {
    loadScripts('tabby-promo', 'https://checkout.tabby.ai/tabby-promo.js')
  }, [])

  if (typeof window != 'undefined' && 'TabbyPromo' in window && isShowTabby) {
    const tabby = window.TabbyPromo as ITabbyPromo
    new tabby({
      selector: '#idTabby',
      currency: 'SAR' || currency,
      price: price,
    })
  }
}

export default useLoadScriptsTabby
