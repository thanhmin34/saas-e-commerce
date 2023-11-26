'use client'
import { Fragment, useCallback, useMemo, useState } from 'react'
// styles
import styles from './styles.module.scss'

import { TAB_PRODUCT_DETAILS } from '@constants/products'
import useIntl from '@hooks/useIntl'
import DescriptionProduct from './Description'
import Button from '@components/button'
import Reviews from './Reviews'
import useReviews from '@lib/reviews/useReviews'

interface IPropsDescription {
  descriptionShort: string
  productId: number
}

const ProductDescriptionTab = ({ descriptionShort, productId }: IPropsDescription) => {
  const { localizeMessage } = useIntl()
  const [activeKey, setActiveKey] = useState(TAB_PRODUCT_DETAILS[0])
  const { data: reviewsData, handleRefetchReviews } = useReviews({ productId })

  const renderTabSelect = useMemo(() => {
    switch (activeKey) {
      case TAB_PRODUCT_DETAILS[0]:
        return <DescriptionProduct data={descriptionShort || ''} />
      case TAB_PRODUCT_DETAILS[1]:
        return <Reviews handleRefetchReviews={handleRefetchReviews} productId={productId} reviewsData={reviewsData} />

      default:
        return <Fragment />
    }
  }, [activeKey, reviewsData])

  const handleTabActive = useCallback(
    (tab: string) => {
      setActiveKey(tab)
    },
    [activeKey]
  )

  return (
    <div className={styles.productDescriptionTab} id="bottomTabs">
      <div className={styles.tab}>
        {TAB_PRODUCT_DETAILS.map((tab, index) => {
          const isSelectTab = tab === activeKey
          return (
            <Button
              isDisableStyles
              className={`${styles.tabItem} ${isSelectTab ? styles.activeTab : ''}`}
              onClick={() => handleTabActive(tab)}
              key={index}
            >
              {localizeMessage(tab)}
            </Button>
          )
        })}
      </div>
      <div className={styles.tabContent}>{renderTabSelect}</div>
    </div>
  )
}

export default ProductDescriptionTab
