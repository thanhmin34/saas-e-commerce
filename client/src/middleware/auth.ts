'use client'
import { NextApiRequest, NextApiResponse } from 'next'
import { useParams, usePathname, useRouter } from 'next/navigation'
import LocalStorageManager from '@utils/simplePersistence'
import { ROUTER_AUTH, ROUTER_PATHS } from '@constants/routerPaths'
import STORAGE_KEYS from '@constants/storageKeys'

export default function checkAuthMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof window === 'undefined') {
      return handler(req, res)
    }

    const router = useRouter()
    const pathName = usePathname()
    const { lang } = useParams()
    const storage = new LocalStorageManager()

    const newPathName = pathName.replace(`/${lang}`, '')

    const isUserLoggedIn = (): boolean => {
      const token = storage.getItem(STORAGE_KEYS.TOKEN)
      return !!token
    }
    const isLogin = isUserLoggedIn()

    if (!isLogin && ROUTER_AUTH.includes(newPathName)) {
      let url = ROUTER_PATHS.LOGIN
      if (ROUTER_AUTH[0] === newPathName) {
        url += `?isCheckoutPage=true`
      }
      router.push(url)
      return
    }
    return handler(req, res)
  }
}
