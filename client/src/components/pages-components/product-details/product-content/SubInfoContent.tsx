'use client'
import React, { Fragment } from 'react'
import useIntl from '@hooks/useIntl'
import styles from './styles.module.scss'
import { SvgIconTypeMap } from '@mui/material'
import { SHARE_SOCIAL } from '@constants/variables'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import {
  WhatsApp as WhatsAppIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material'
import Link from 'next/link'

type Props = {
  outOfStock: boolean
  sku: string
}

const SubInfoContent = React.memo((props: Props) => {
  const { outOfStock, sku } = props || {}
  const { localizeMessage } = useIntl()
  const skuTitle = localizeMessage('Product code:')
  const stockStatus = localizeMessage(!!outOfStock ? 'Unavailable' : 'Available')

  const renderShareSocialContent = () => {
    return SHARE_SOCIAL.map((item, index) => {
      const { enable, id_share_social, link } = item || {}
      const key = `share-social-${index}-${id_share_social}`
      if (enable) {
        type SocialMediaList = {
          [key in string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
            muiName: string
          }
        }

        const socialData: SocialMediaList = {
          facebook: FacebookIcon,
          instagram: InstagramIcon,
          twitter: TwitterIcon,
          whatApp: WhatsAppIcon,
          linkedIn: LinkedInIcon,
        }

        if (id_share_social && socialData[id_share_social]) {
          const Icon = socialData[id_share_social] || <Fragment />
          return (
            <Link href={link} key={key}>
              <Icon width={16} />
            </Link>
          )
        }

        return <Fragment />
      }
    })
  }

  return (
    <div className={styles.otherInfo}>
      <div className={styles.sku}>
        <span className={styles.title}>{skuTitle}</span>
        <span className={styles.value}>{sku}</span>
        <span className={styles.status}>{stockStatus}</span>
      </div>
      <div className={styles.share}>
        <span className={`${styles.heavy}`}>{localizeMessage('Share:')}</span>
        <div className={styles.value}>
          <ul className={styles.socialIcons}>{renderShareSocialContent()}</ul>
        </div>
      </div>
    </div>
  )
})

export default SubInfoContent
