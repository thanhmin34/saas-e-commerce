import { IMyAddressItem } from '@interfaces/user'

export interface IActionsAddress {
  payload: IMyAddressItem[]
  type: string
}

export interface IIniStateAddress {
  address: IMyAddressItem[] | []
}
