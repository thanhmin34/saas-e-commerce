'use client'
import { useCallback, useEffect, useRef } from 'react'
import { TWE } from '@constants/variables'
import STORAGE_KEYS from '@constants/storageKeys'
import LocalStorageManager from '@utils/simplePersistence'
import { RootState } from '@redux/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSignIn } from '@redux/actions/userInfoAction'
import useLoginExpired from '@lib/auth/useLoginExpired'
import useAccount from '@lib/account-information/useAccount'

const TTL = 24 * 60 * 60

const useAuth = () => {
  const dispatch = useDispatch()
  const storage = new LocalStorageManager()
  const { handleLoginExpired } = useLoginExpired()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  let jsonToken =
    typeof window !== 'undefined'
      ? storage.getItem(STORAGE_KEYS.TOKEN)
        ? storage.getItem(STORAGE_KEYS.TOKEN)
        : null
      : null

  const calledRef = useRef<boolean>()
  const isSignedInRef = useRef<boolean>(false)
  const now = Date.now()

  const { timeStored, value } = jsonToken || {}

  useAccount({ enabled: isSignedInRef.current })
  const handleSignOut = useCallback(async () => {
    try {
      if (!!timeStored && !calledRef.current) {
        handleLoginExpired()
        calledRef.current = true
      }
      setTimeout(() => {
        calledRef.current = false
      }, 1000)
    } catch (error) {
      calledRef.current = true
      setTimeout(() => {
        calledRef.current = false
      }, 1000)
      console.error(error)
    }
  }, [timeStored, calledRef])

  useEffect(() => {
    if (timeStored && TTL) {
      const timeRemainExpired = now - timeStored
      const timeout = TTL * 1000 - timeRemainExpired - TWE * 1000

      let checkAuthTimeout: NodeJS.Timeout
      // If timestored is has value, it mean has token and user login
      if (!!timeStored) {
        // if time timeout > 0 | user still action in site, we will call login after 2 min as time setup in BE
        if (timeout > 0) {
          checkAuthTimeout = setTimeout(handleSignOut, timeout)
        } else if (timeout < 0) {
          // If timeout < 0 | user quit site and reopen when token is expried, it will auto login without time out
          handleSignOut()
        }
      }
      return () => {
        clearTimeout(checkAuthTimeout)
      }
    }
  }, [now, timeStored, TTL, handleSignOut])

  useEffect(() => {
    dispatch(setIsSignIn(!!timeStored))
    if (userInfo && value) {
      isSignedInRef.current = !('id' in userInfo)
    }
  }, [timeStored, userInfo, value])

  // useEffect(() => {
  //   const onRemoveSignInToken = async (e: StorageEvent) => {
  //     try {
  //       if (e.key === `${STORAGE_KEYS.TOKEN}` && !e.newValue) {
  //         // const token = JSON.parse(e?.oldValue)
  //         // const authToken = JSON.parse(token?.value)
  //         //signOut TODO
  //         handleLoginExpired()
  //         // handle checkout data
  //       } else if (e.newValue === e.oldValue && !e.newValue && !e.oldValue && !e.key && e.storageArea?.length === 0) {
  //         handleLoginExpired()
  //         // handle checkout data
  //       } else return
  //     } catch (error) {
  //       return
  //     }
  //   }
  //   window.addEventListener('storage', onRemoveSignInToken)
  // }, [])

  return {}
}

export default useAuth
