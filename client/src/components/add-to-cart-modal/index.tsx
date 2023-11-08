import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@components/button'
import useIntl from '@hooks/useIntl'
import Image from 'next/image'
import styles from './styles.module.scss'

import AddIcon from '@mui/icons-material/Add'
import { BUTTON_TYPES } from '@constants/colors'
import { useRouter } from 'next/navigation'
import { ROUTER_PATHS } from '@constants/routerPaths'

export default function AddToCartModal({ item, show, handleToggleModal }: any) {
  const { push } = useRouter()
  const { localizeMessage } = useIntl()
  function renderPrice() {
    return '123'
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    // boxShadow: 24,
    borderRadius: 1,
  }

  const renderFooter = (
    <div className={styles.footer}>
      <Button buttonType={BUTTON_TYPES.OUTLINE} className="button" onClick={handleToggleModal}>
        <p>{localizeMessage('Continue Shopping')}</p>
      </Button>
      <Button
        onClick={() => {
          handleToggleModal()
          push(ROUTER_PATHS.CART)
        }}
      >
        <p>{localizeMessage('View cart')}</p>
      </Button>
    </div>
  )

  const renderInfo = (
    <div className={styles.info}>
      <div className={styles.image}>
        <Image
          src={
            'https://media.9ten.cloud/media/catalog/product/cache/3a2767d19dd730d30b16d3926fb0aba4/h/a/hair_brush_-_green_-_large-min.jpg'
          }
          layout="fixed"
          height={150}
          width={150}
          alt="img"
        />
      </div>
      <section className={styles.detail}>
        <p>product.name</p>
        <section className={styles.miniDetail}>
          <div className={styles.line}>
            <p className={styles.label}>{localizeMessage('Price')}</p>
            {/* {renderPrice()} */}
            550000
          </div>
          <div className={styles.line}>
            <p className={styles.label}>{localizeMessage('Quantity')}:</p>
            <p className={styles.text}>quantity</p>
          </div>
        </section>
      </section>
    </div>
  )

  return (
    <Modal
      open={show}
      onClose={handleToggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.addToCartModal}>
          <div onClick={handleToggleModal} className={styles.close}>
            <AddIcon />
          </div>
          <div className={styles.container}>
            <h5 className={styles.title}>{localizeMessage('Items was add to cart')}</h5>
            {renderInfo}
            {renderFooter}
          </div>
        </div>
      </Box>
    </Modal>
  )
}
