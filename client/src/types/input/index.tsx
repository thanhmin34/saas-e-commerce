import { ChangeEventHandler } from 'react'

export type InputPrimaryType = {
  value: string | number | undefined
  placeholder: string | undefined
  type: string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
  name: string | undefined
  className: string | undefined
  message: string | undefined
}
