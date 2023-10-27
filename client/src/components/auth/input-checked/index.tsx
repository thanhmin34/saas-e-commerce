import React, { ChangeEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

import { ROUTER_PATHS } from '@constants/routerPaths'
import useIntl from '@hooks/useIntl'
import Checkbox from '@mui/material/Checkbox'
interface Props {
  handleChecked: ChangeEventHandler<HTMLInputElement>
  checked: boolean
  className?: string
}
type PropsPartial = Partial<Props>

const InputChecked = ({ handleChecked, checked, className }: PropsPartial) => {
  const { push } = useRouter()
  const { localizeMessage } = useIntl()

  return (
    <div className={`${styles.inputRules} ${className ? className : ''}`}>
      <Checkbox onChange={handleChecked} checked={checked} inputProps={{ 'aria-label': 'controlled' }} />
      <span onClick={() => push(ROUTER_PATHS.TERM_CONDITION)}>
        {localizeMessage("I've read and accepted Terms of Services & Privacy Policy.")}
      </span>
    </div>
  )
}

export default InputChecked
