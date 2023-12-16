import React, { useRef, useEffect } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
interface IPropsOutsideClick {
  handleClickOutside: () => void
  ref: React.RefObject<HTMLElement | null>
}
export default function useOutsideClick({ ref, handleClickOutside }: IPropsOutsideClick) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutside && handleClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref])
}
