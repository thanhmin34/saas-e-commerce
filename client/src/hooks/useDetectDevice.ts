import { useEffect, useState } from 'react'
import { DEVICE } from '@constants/device'

const useDetectDevice = () => {
  const [device, setDevice] = useState<string | null>(null)
  const [innerWidth, setInnerWidth] = useState<number | null>(null)

  const handleResize = (innerWidth: number) => {
    setInnerWidth(innerWidth)
    setDevice(innerWidth >= 1024 ? DEVICE.DESKTOP : innerWidth >= 768 ? DEVICE.TABLET : DEVICE.MOBILE)
  }

  useEffect(() => {
    if (window) {
      handleResize(window.innerWidth)
      window.addEventListener('resize', (e: Event) => {
        const target = e.target as Window
        handleResize(target.innerWidth)
      })
    }
    return () => {
      if (window) {
        window.removeEventListener('resize', (e) => {
          const target = e.target as Window
          handleResize(target.innerWidth)
        })
      }
    }
  }, [])

  return {
    device,
    innerWidth,
  }
}

export default useDetectDevice
