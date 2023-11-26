'use client'
import React from 'react'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'

interface IPropsDescriptionProduct {
  data: string
}

const DescriptionProduct = (props: IPropsDescriptionProduct) => {
  const { data } = props || {}
  const { localizeMessage } = useIntl()

  return (
    <div className={styles.details}>
      <h2 className={styles.title}>{localizeMessage('Product Description')}</h2>
      {data && <div className={styles.content} dangerouslySetInnerHTML={{ __html: data }} />}
    </div>
  )
}

export default DescriptionProduct
