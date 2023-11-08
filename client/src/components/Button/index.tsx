import { useMemo } from 'react'
import styles from './styles.module.scss'
import { BUTTON_TYPES } from '@constants/colors'

interface ConfigButton {
  color: string | undefined
  backgroundColor: string | undefined
  borderRadius: string | undefined
  borderColor: string | undefined
  border: string | undefined
}
const Button: React.FC<{
  style?: React.CSSProperties
  className?: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean | undefined
  otherProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  buttonType?: string
}> = ({ style, className, children, onClick, disabled, buttonType, ...otherProps }) => {
  const stylesButton: ConfigButton = {
    borderRadius: '4',
    backgroundColor: 'rgb(0, 104, 52)',
    color: 'rgb(255, 255, 255)',
    borderColor: 'rgb(0, 104, 52)',
    border: 'none',
  }

  const stylesOutlineButton: ConfigButton = {
    borderRadius: '4',
    backgroundColor: 'transparent',
    color: '#149447',
    borderColor: '#149447',
    border: '1px solid #149447',
  }

  const _style = useMemo(() => {
    if (buttonType == BUTTON_TYPES.OUTLINE) {
      return { ...stylesOutlineButton, ...style }
    }
    return { ...stylesButton, ...style }
  }, [style, buttonType])

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={_style}
      className={`${styles.button} ${className ? className : ''}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button
