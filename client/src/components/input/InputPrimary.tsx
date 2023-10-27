import styles from './styles.module.scss'
import React, { ChangeEventHandler } from 'react'

interface InputPrimary {
  value: string | number
  placeholder: string
  type: string
  onChange: ChangeEventHandler<HTMLInputElement>
  name: string
  className: string
  message: string
  refInput: object
  onBlur: ChangeEventHandler<HTMLInputElement>
}

type InputOption = Partial<InputPrimary>

const InputPrimary = React.forwardRef((props: InputOption, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
  const { type = 'text', placeholder = 'Enter the input', name, className, message, refInput, onChange, onBlur } = props

  return (
    <>
      <div className={`${styles.inputElement} ${className}`}>
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            name={name}
            type={type}
            placeholder=" "
            onChange={onChange}
            onBlur={onBlur}
            className={styles.input}
            {...refInput}
          />
          <span className={styles.label}>{placeholder}</span>
        </div>
      </div>
      {message ? <div className={styles.messageError}>{message}</div> : ''}
    </>
  )
})

export default InputPrimary
