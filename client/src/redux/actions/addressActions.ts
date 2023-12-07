import { IActionsAddress } from '@interfaces/redux/address'
import { IMyAddressItem } from '@interfaces/user'

export const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST'

export const setAddress = (address: IMyAddressItem[]) => {
  const action: IActionsAddress = {
    type: SET_ADDRESS_LIST,
    payload: address,
  }
  return action
}
