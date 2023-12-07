'use client'
import dynamic from 'next/dynamic'
import React, { Fragment, Suspense, useCallback, useMemo, useState } from 'react'

import { VIEW_CONTENT_ADDRESS } from '@constants/account'
import { IMyAddressList, TCreateAddressParams } from '@interfaces/user'
import Loading from '@components/loading'

const AddressList = dynamic(() => import('./address-list'), {
  ssr: false,
})
const CreateAddress = dynamic(() => import('./create-address-list'), {
  ssr: false,
})

interface IProps {
  addressData: IMyAddressList
  onCreateAddress: (address: TCreateAddressParams) => Promise<boolean>
  onDeleteAddress: (id: number) => void
}

const MyAddress = (props: IProps) => {
  const { addressData, onCreateAddress, onDeleteAddress } = props || {}
  const [viewContent, setViewContent] = useState(VIEW_CONTENT_ADDRESS.ADDRESS_LIST)

  const onChangeView = useCallback(
    (view: string) => {
      setViewContent(view)
    },
    [viewContent]
  )

  const renderViewUI = useMemo(() => {
    interface IViewPage {
      [key: string]: React.JSX.Element
    }
    const viewPage: IViewPage = {
      [VIEW_CONTENT_ADDRESS.ADDRESS_LIST]: (
        <AddressList onChangeView={onChangeView} addressData={addressData} onDeleteAddress={onDeleteAddress} />
      ),
      [VIEW_CONTENT_ADDRESS.CREATE_ADDRESS]: (
        <CreateAddress onChangeView={onChangeView} onCreateAddress={onCreateAddress} />
      ),
    }
    if (viewContent && viewPage[viewContent as keyof IViewPage]) {
      return <Suspense fallback={<Loading />}>{viewPage[viewContent]}</Suspense>
    }
    return <Fragment />
  }, [viewContent, addressData])

  return renderViewUI
}

export default MyAddress
