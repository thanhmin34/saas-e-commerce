import { ConfigAction, IConfigApp } from '../../interfaces/redux/config'
import { SET_CONFIG } from '../actions/configAction'

const initState: IConfigApp = {
  button: {
    border_radius: '',
    background_color: '',
    color: '',
    border_color: '',
    border: '',
  },
  font_size: '',
  font_weight: '',
  hover_text: '',
  hover_background_color: '',
  background_color: '',
  color: '',
  currency: '',
  banner_checkout_left: '',
  banner_checkout_right: '',
  url_media_backend: '',
  prefix_url_media: '',
  national_flags_image: '',
}

const configReducer = (state = initState, action: ConfigAction) => {
  switch (action.type) {
    case SET_CONFIG:
      return action.config
    default:
      return state
  }
}

export default configReducer
