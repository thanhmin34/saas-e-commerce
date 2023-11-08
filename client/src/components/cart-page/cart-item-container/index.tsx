import { first, get } from 'lodash'
import React, { Fragment, useMemo } from 'react'

import styles from '../styles.module.scss'
import useDetectDevice from '@hooks/useDetectDevice'
import Loading from '@components/loading'
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import CartItemsHeader from './CartItemsHeader'
import { DEVICE } from '@constants/device'
import NoItemMessage from '../not-item-message'
import Button from '@components/button'
import { ROUTER_PATHS } from '@constants/routerPaths'
import useIntl from '@hooks/useIntl'
import { useRouter } from 'next/navigation'
import CartItem from '../cart-item'
import { BUTTON_TYPES } from '@constants/colors'

export default function CartItemsContainer() {
  const { localizeMessage } = useIntl()
  const { push } = useRouter()
  const cart = useSelector((state: RootState) => state.cartData)

  const totalQuantity = get(cart, 'total_quantity')
  const couponCode = get(cart, 'applied_coupons[0].code') || ''
  const items = get(cart, 'products')

  const { device } = useDetectDevice()
  const loading = false

  function renderNormalCartItemContainer() {
    if (loading) {
      return <Loading />
    }

    const hasItems = totalQuantity > 0
    const productsContainer = hasItems && (
      <>
        <CartItemsHeader />
        <ul className={styles.productsContainer}>
          {items?.map((item, index) => (
            <CartItem key={`${index}`} item={item} />
          ))}
        </ul>
      </>
    )

    return (
      <div className={styles.cartItemsContainer}>
        {productsContainer || <NoItemMessage />}
        <div className={`${styles.footer} ${hasItems ? '' : styles.noItems}`}>
          <Button
            className={styles.buttonBack}
            buttonType={BUTTON_TYPES.OUTLINE}
            onClick={() => push(ROUTER_PATHS.HOME)}
          >
            {localizeMessage('Continue Shopping')}
          </Button>
        </div>
      </div>
    )
  }

  function renderMobileCartItemContainer() {
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      )
    }
    return (
      <Fragment>
        {totalQuantity > 0 && <CartItemsHeader />}
        <div className={styles.mobile}>
          {totalQuantity > 0 ? (
            <ul className={styles.productsContainer}>
              {/* {first(items) &&
                items.map((item) => {
                  return (
                    <CartItem
                      item={item}
                      couponCode={couponCode}
                      key={`${item?.id}_${item?.quantity}`}
                      setIsQuantityEditing={setIsQuantityEditing}
                    />
                  )
                })} */}
            </ul>
          ) : (
            <NoItemMessage />
          )}
          <div className={`${styles.footer} ${totalQuantity === 0 ? '' : styles.noItems}`}>
            <Button onClick={() => push(ROUTER_PATHS.HOME)}>{localizeMessage('Continue Shopping')}</Button>
          </div>
        </div>
      </Fragment>
    )
  }

  const content = useMemo(() => {
    switch (device) {
      case DEVICE.MOBILE:
        return renderMobileCartItemContainer()
      default:
        return renderNormalCartItemContainer()
    }
  }, [device, renderMobileCartItemContainer, renderNormalCartItemContainer])

  return <>{content}</>
}
