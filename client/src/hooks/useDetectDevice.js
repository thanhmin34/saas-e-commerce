import { useEffect, useState } from 'react'
import { DEVICE } from '@constants/device'

const useDetectDevice = () => {
  const [device, setDevice] = useState(null)
  const [innerWidth, setInnerWidth] = useState(null)

  const handleResize = (innerWidth) => {
    setInnerWidth(innerWidth)
    setDevice(innerWidth >= 1024 ? DEVICE.DESKTOP : innerWidth >= 768 ? DEVICE.TABLET : DEVICE.MOBILE)
  }

  useEffect(() => {
    if (window) {
      handleResize(window.innerWidth)
      window.addEventListener('resize', (e) => handleResize(e.target.innerWidth))
    }
    return () => {
      if (window) {
        window.removeEventListener('resize', (e) => handleResize(e.target.innerWidth))
      }
    }
  }, [])

  return {
    device,
    innerWidth,
  }
}

export default useDetectDevice
