import { STAR_COLOR } from '@constants/colors'
import React from 'react'

import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

interface IProps {
  rate: number
  onChange?: (name: string, value: number) => void
  name: string
  countStar: React.Dispatch<React.SetStateAction<number>>
  size?: number
}
const InputRating = (props: IProps) => {
  const { rate, onChange, name, countStar, size } = props

  const star = (rate: number) => {
    const starList = []
    for (let i = 1; i <= 5; i++) {
      starList.push(
        <span
          key={`${i}`}
          onClick={() => {
            onChange && onChange(name, i)
            countStar(i)
          }}
          className="star-icon"
        >
          {rate >= i ? (
            <IoIosStar key={i} color={STAR_COLOR} size={size || 20} />
          ) : (
            <IoIosStarOutline key={i} size={size || 20} />
          )}
        </span>
      )
    }
    return starList
  }

  return star(rate)
}

export default InputRating
