import React, { useEffect, useRef } from 'react'

export const useMegaMenu = () => {
  const mainMegaMenu = useRef<HTMLDivElement | null>(null)
  const itemRef = useRef<HTMLDivElement | null>(null)
  const subMegaMenu = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleMouseMove(event: any) {
      //   if (
      //     itemRef?.current &&
      //     subMegaMenu?.current &&
      //     mainMegaMenu?.current &&
      //     !itemRef.current.contains(event.target) &&
      //     !subMegaMenu.current.contains(event.target) &&
      //     !mainMegaMenu.current.contains(event.target)
      //   ) {
      //     console.log('!23')
      //     return
      //   }
      if (itemRef?.current && itemRef.current.contains(event.target)) {
        console.log('event', itemRef)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [itemRef, subMegaMenu])

  return {
    mainMegaMenu,
    itemRef,
    subMegaMenu,
  }
}
