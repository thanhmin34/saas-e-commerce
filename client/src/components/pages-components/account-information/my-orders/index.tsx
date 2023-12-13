'use client'
import React, { Fragment } from 'react'
import MyOrderListDesktop from './MyOrderListDesktop'
import useDetectDevice from '@hooks/useDetectDevice'
import { DEVICE } from '@constants/device'
import { IKeyOfOject } from '@interfaces/global'
import MyOrdersMobile from './my-order-mobile'

const MyOrders = () => {
  const { device } = useDetectDevice()

  const renderView = (device: string) => {
    const deviceList: IKeyOfOject = {
      [DEVICE.DESKTOP]: <MyOrderListDesktop />,
      [DEVICE.MOBILE]: <MyOrdersMobile />,
    }
    if (device && deviceList[device as keyof IKeyOfOject]) {
      return deviceList[device]
    }
    return <Fragment />
  }
  return <Fragment>{renderView(device as string)}</Fragment>
}

export default MyOrders
