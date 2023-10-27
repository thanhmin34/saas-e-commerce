import { ConfigAction, ConfigApp } from "../../interfaces/redux/config";

export const SET_CONFIG: string = "SET_CONFIG";

export const setConfig = (config: ConfigApp) => {
  const action: ConfigAction = {
    type: SET_CONFIG,
    config,
  };
  return action;
};
