import styles from './styles.module.scss'
import React, { ChangeEventHandler } from 'react'

interface InputText {
  value: string | number
  placeholder?: string | undefined
  type?: string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
  name?: string | undefined
  className?: string | undefined
  message?: string | undefined
}

const InputText = ({
  value = '',
  onChange,
  type = 'text',
  placeholder = 'Enter the input',
  name,
  className,
  message,
}: InputText) => {
  return (
    <div className={`${styles.inputElement}`}>
      <input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
        type={type}
        className={`${styles.input} ${className}`}
      />
      {message ? <div className={styles.messageError}>{message}</div> : ''}
    </div>
  )
}

export default InputText
