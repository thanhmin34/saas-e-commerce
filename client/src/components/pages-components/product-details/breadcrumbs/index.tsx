'use client'
import React, { Fragment, useId } from 'react'
import styles from './styles.module.scss'
import { isEmpty, map } from 'lodash'
import Link from 'next/link'
import useIntl from '@hooks/useIntl'
import { ROUTER_PATHS } from '@constants/routerPaths'
interface Props {
  productName: string
}
const DELIMITER = '/'

const Breadcrumbs = (props: Props) => {
  const id = useId()
  const { productName } = props || {}
  const { localizeMessage } = useIntl()

  const categoryData = [
    {
      link: '/',
      name: 'category',
    },
  ]

  const renderBreadcrumbs = (categoryData: { link: string; name: string }[]) => {
    if (isEmpty(categoryData)) {
      return <Fragment />
    }
    return map(categoryData, (item, index) => {
      return (
        <Fragment key={`${id}_${index}`}>
          <span className={`${styles.divider} ${styles.text}`}>{DELIMITER}</span>
          <Link className={`${styles.link} ${styles.text}`} href={item.link}>
            {item.name}
          </Link>
        </Fragment>
      )
    })
  }

  return (
    <div className={`${styles.breadcrumbs}`}>
      <Link className={`${styles.link} ${styles.text}`} href={ROUTER_PATHS.HOME}>
        {localizeMessage('Home')}
      </Link>
      {renderBreadcrumbs(categoryData)}
      <Fragment>
        <span className={`${styles.divider} ${styles.text}`}>{DELIMITER}</span>
        <div className={`${styles.link} ${styles.current}`}>{productName}</div>
      </Fragment>
    </div>
  )
}

export default Breadcrumbs
