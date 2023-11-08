import { ConfigAction, IConfigApp } from '../../interfaces/redux/config'

export const SET_CONFIG: string = 'SET_CONFIG'

export const setConfig = (config: IConfigApp) => {
  const action: ConfigAction = {
    type: SET_CONFIG,
    config,
  }
  return action
}
