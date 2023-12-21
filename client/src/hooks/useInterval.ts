import { useEffect, useRef } from 'react'

type TFunc = () => void
export const useInterval = () => {
  function useIntervalTime(callback: TFunc, delay: number) {
    const savedCallback = useRef<null | TFunc>(null)

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      let id = setInterval(() => {
        if (savedCallback?.current) {
          savedCallback.current()
        }
      }, delay)
      return () => clearInterval(id)
    }, [delay])
  }

  return {
    useIntervalTime,
  }
}
