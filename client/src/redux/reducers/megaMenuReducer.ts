import { MegaMenu, MegaMenuAction } from '@interfaces/redux/megaMenu'
import { SET_MEGA_MENU } from '@redux/actions/megaMenuAction'

const initState: MegaMenu | {} = {}

const megaMenuReducer = (state = initState, action: MegaMenuAction) => {
  switch (action.type) {
    case SET_MEGA_MENU:
      return action.megaMenu
    default:
      return state
  }
}

export default megaMenuReducer
