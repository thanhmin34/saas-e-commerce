import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { LIST_ACCOUNT_MENU } from '@constants/account'

const PrivateAccountContext = createContext({
  handleToggleSidebar: () => {},
  isMenuSidebarShowed: false,
  handleSelectedTab: (id: string) => {},
  selectedTabId: LIST_ACCOUNT_MENU.MY_ACCOUNT,
})

export default function PrivateAccountMenuProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const pathRouter = usePathname()
  const [isMenuSidebarShowed, setIsMenuSidebarShowed] = useState<boolean>(false)
  const [selectedTabId, setSelectedTabId] = useState<string>(LIST_ACCOUNT_MENU.MY_ACCOUNT)
  const lang = params?.lang as string
  const pathName = pathRouter ? pathRouter.replace(`/${lang}`, '') : ''

  useEffect(() => {
    const hash = window.location.hash
    const tabId = hash.slice(1)
    if (!!tabId) {
      setSelectedTabId(tabId)
    } else {
      setSelectedTabId(LIST_ACCOUNT_MENU.MY_ACCOUNT)
    }
  }, [router])

  const handleSelectedTab = useCallback(
    (id: string) => {
      setSelectedTabId(id)
      router.push(`${pathName}#${id}`)
    },
    [selectedTabId, setSelectedTabId, router]
  )

  const handleToggleSidebar = useCallback(() => {
    setIsMenuSidebarShowed(!isMenuSidebarShowed)
  }, [isMenuSidebarShowed, setIsMenuSidebarShowed])

  return (
    <PrivateAccountContext.Provider
      value={{ handleToggleSidebar, isMenuSidebarShowed, handleSelectedTab, selectedTabId }}
    >
      {children}
    </PrivateAccountContext.Provider>
  )
}

export const usePrivateAccountMenuContext = () => useContext(PrivateAccountContext)
