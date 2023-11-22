'use client'
import { ROUTER_PATHS } from '@constants/routerPaths'
import useAuth from '@hooks/useAuth'
import { setUserInfo } from '@redux/actions/userInfoAction'
import { RootState } from '@redux/reducers'
import { checkRouteNeedAuthorized, checkRouteUnauthorized } from '@utils/helper'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Fragment, ReactNode, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IWrapper {
  children: ReactNode
}
const Wrapper = (props: IWrapper) => {
  const { children } = props || {}
  useAuth()

  const { replace, push } = useRouter()
  const fullPathName = usePathname()
  const { lang = '' } = useParams()
  const dispatch = useDispatch()
  const { isSignedIn } = useSelector((state: RootState) => state.userInfo)
  const newPathName = fullPathName ? fullPathName.replace(`/${lang as string}`, '') : ''

  const checkAuth = useCallback(() => {
    if (isSignedIn && checkRouteUnauthorized(newPathName)) {
      replace(ROUTER_PATHS.ACCOUNT_INFORMATION)
    }
  }, [isSignedIn, newPathName])

  useEffect(() => {
    checkAuth()
  }, [])

  //* With new flow On-Demand, if user go to the page need to login, FE will redirect to login
  useEffect(() => {
    if (!isSignedIn && checkRouteNeedAuthorized(newPathName)) {
      push(ROUTER_PATHS.LOGIN)
      return
    }
  }, [isSignedIn, newPathName])

  //* Handle clear redux data if user sign out
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(setUserInfo({ userInfo: {} }))
      // dispatch(setWishlist(null))
    }
  }, [isSignedIn])

  return <Fragment>{children}</Fragment>
}

export default Wrapper
