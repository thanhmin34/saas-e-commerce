'use client'
import { Fragment, PropsWithChildren } from 'react'
import useConfigApp from '@lib/config/getConfigApp'

export const AppProvider = (props: PropsWithChildren) => {
  useConfigApp()
  return <Fragment>{props.children}</Fragment>
}
