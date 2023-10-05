import { useMemo } from 'react'
import styles from './styles.module.scss'

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
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean | undefined
  otherProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}> = ({ style, className, children, onClick, disabled, ...otherProps }) => {
  const stylesButton: ConfigButton = {
    borderRadius: '4px',
    backgroundColor: 'rgb(0, 104, 52)',
    color: 'rgb(255, 255, 255)',
    borderColor: 'rgb(0, 104, 52)',
    border: 'none',
  }

  const _style = useMemo(() => {
    return { ...style, ...stylesButton }
  }, [style])

  return (
    <button onClick={onClick} disabled={disabled} style={_style} className={`${styles.button}`} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
