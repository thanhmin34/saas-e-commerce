import { ConfigAction, ConfigApp } from "../../interfaces/redux/config";
import { SET_CONFIG } from "../actions/configAction";

const initState: ConfigApp | {} = {};

const configReducer = (state = initState, action: ConfigAction) => {
  switch (action.type) {
    case SET_CONFIG:
      return action.config;
    default:
      return state;
  }
};

export default configReducer;
