import React, { Fragment } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import styles from './styles.module.scss'
import AddIcon from '@mui/icons-material/Add'

type Props = {
  isOpen: boolean
  children: React.ReactNode
  handleClose: () => void
  className?: string
}

const Model = (props: Props) => {
  const { isOpen, handleClose, children, className } = props

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 'none',
    // boxShadow: 24,
    borderRadius: 1,
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={className}
    >
      <Box sx={style}>
        <div className={styles.model}>
          <div onClick={handleClose} className={styles.close}>
            <AddIcon />
          </div>
          {children}
        </div>
      </Box>
    </Modal>
  )
}

export default Model
