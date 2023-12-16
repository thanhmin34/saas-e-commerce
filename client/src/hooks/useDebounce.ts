import React, { useEffect, useState } from 'react'

interface Props {
  value: string
  delay: number
}

const useDebounce = (props: Props) => {
  const { value, delay } = props
  const [debounceValue, setDebounceValue] = useState<string>(value)

  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearInterval(time)
  }, [value, delay])
  return debounceValue
}

export default useDebounce
