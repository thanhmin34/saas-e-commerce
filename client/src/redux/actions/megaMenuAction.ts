import { IMegaMenu, IMegaMenuAction } from '@interfaces/redux/megaMenu'

export const SET_MEGA_MENU: string = 'SET_MEGA_MENU'

export const setMegaMenu = (megaMenu: IMegaMenu) => {
  const action: IMegaMenuAction = {
    type: SET_MEGA_MENU,
    payload: megaMenu,
  }
  return action
}
