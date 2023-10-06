import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import styles from './styles.module.scss'
type Props = {
  isOpen: boolean
  children: React.ReactNode
  handleClose: () => void
}

const Model = (props: Props) => {
  const { isOpen, handleClose, children } = props
  return (
    <Dialog open={isOpen} onClose={handleClose} className={styles.model}>
      <Dialog.Panel>{children}</Dialog.Panel>
    </Dialog>
  )
}

export default Model
