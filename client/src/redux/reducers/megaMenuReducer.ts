import { IMegaMenu, IMegaMenuAction } from '@interfaces/redux/megaMenu'
import { SET_MEGA_MENU } from '@redux/actions/megaMenuAction'

const initState: IMegaMenu | [] = []

const megaMenuReducer = (state = initState, action: IMegaMenuAction) => {
  switch (action.type) {
    case SET_MEGA_MENU:
      return action.payload
    default:
      return state
  }
}

export default megaMenuReducer
