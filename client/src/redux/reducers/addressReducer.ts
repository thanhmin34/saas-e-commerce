import { SET_ADDRESS_LIST } from '@redux/actions/addressActions'
import { IActionsAddress, IIniStateAddress } from '@interfaces/redux/address'

const initState: IIniStateAddress = {
  address: [],
}

const addressReducer = (state = initState, action: IActionsAddress) => {
  switch (action.type) {
    case SET_ADDRESS_LIST:
      return { ...state, address: action.payload }
    default:
      return state
  }
}

export default addressReducer
