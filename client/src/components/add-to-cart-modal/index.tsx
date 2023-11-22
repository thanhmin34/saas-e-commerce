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
import { IAddProductItem } from '@interfaces/cart'
import PriceBlock from '@components/productItem/PriceBlock'

export default function AddToCartModal({
  item,
  show,
  handleToggleModal,
}: {
  item: IAddProductItem
  show: boolean
  handleToggleModal: () => void
}) {
  const { push } = useRouter()
  const { localizeMessage } = useIntl()
  const { product } = item || {}
  const { price, quantity, image, name } = product || {}

  const special_price = 12
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

  function renderPrice() {
    return (
      <PriceBlock
        className={styles.priceBlock}
        price={price as number}
        special_price={{
          max_price: price as number,
          minimum_price: special_price as number,
        }}
      />
    )
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
        <Image src={image?.url as string} layout="fixed" height={150} width={150} alt={image?.label as string} />
      </div>
      <section className={styles.detail}>
        <p>{name || ''}</p>
        <section className={styles.miniDetail}>
          <div className={styles.line}>
            <p className={styles.label}>{localizeMessage('Price')}:</p>
            {renderPrice() || 0}
          </div>
          <div className={styles.line}>
            <p className={styles.label}>{localizeMessage('Quantity')}:</p>
            <p className={styles.text}>{quantity || 0}</p>
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
