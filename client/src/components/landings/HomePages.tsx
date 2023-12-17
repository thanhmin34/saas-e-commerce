'use client'
import dynamic from 'next/dynamic'
import { get, map } from 'lodash'
import { Fragment, useId, useMemo } from 'react'

import styles from './styles.module.scss'
import Loading from '@components/loading'
import useLandingPage from '@lib/landings/useLandingPage'
import { TYPES_LANDING_PAGES } from '@constants/variables'

const SliderBlock = dynamic(() => import('./HTMLBlock/slider'), {
  loading: () => <Loading />,
})

const Banner = dynamic(() => import('./HTMLBlock/banner'), {
  loading: () => <Loading />,
})
const ProductSliders = dynamic(() => import('./HTMLBlock/product-slider'), {
  loading: () => <Loading />,
})

const HomePages = ({}) => {
  const { data, isLoading } = useLandingPage()
  const _id = useId()

  const content = useMemo(() => {
    let content: JSX.Element[] = map([], (i, key) => <Fragment key={`${key}_`} />)
    const landingPage = get(data, 'home_page')

    if (landingPage) {
      content = map(landingPage, (item, index) => {
        const { type, title } = item || {}
        const _type = type as string
        interface IViewTypes {
          [x: string]: JSX.Element
        }
        const productsParams = {
          products: get(item, 'products', []),
          position: item?.position,
          banner: item?.banner,
          title,
        }
        const viewTypes: IViewTypes = {
          [TYPES_LANDING_PAGES.SLIDER]: (
            <SliderBlock key={`${index}_${_id}`} images={get(item, 'image_slider.images', [])} />
          ),
          [TYPES_LANDING_PAGES.BANNER_SLIDER]: (
            <Banner key={`${index}_${_id}`} banners={get(item, 'image_slider.images', [])} />
          ),
          [TYPES_LANDING_PAGES.PRODUCT_LIST]: <ProductSliders key={`${index}_${_id}`} item={productsParams} />,
        }
        const viewUI = viewTypes[_type as keyof IViewTypes]
        if (_type && viewUI) {
          return viewUI
        }
        return <Fragment key={`${index}_${_id}`} />
      })
    }
    return content
  }, [data])

  return (
    <div className={styles.homePages}>
      {content}
      {isLoading && <Loading />}
    </div>
  )
}

export default HomePages
