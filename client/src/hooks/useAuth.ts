'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import LocalStorageManager from '@utils/simplePersistence'
import STORAGE_KEYS from '@constants/storageKeys'
import { TWE } from '@constants/constants'
const TTL = 60 * 60
const useAuth = () => {
  const storage = new LocalStorageManager()
  let jsonToken =
    typeof window !== 'undefined'
      ? storage.getItem(STORAGE_KEYS.TOKEN)
        ? storage.getItem(STORAGE_KEYS.TOKEN)
        : null
      : null

  const calledRef = useRef<boolean>()
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const now = Date.now()

  const { timeStored } = jsonToken || {}
  const handleSignOut = useCallback(async () => {
    try {
      if (!!timeStored && !calledRef.current) {
        storage.removeItem(STORAGE_KEYS.TOKEN)
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
    if (timeStored) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }, [timeStored])

  return { isSignedIn }
}

export default useAuth
