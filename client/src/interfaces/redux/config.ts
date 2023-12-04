export interface IConfigApp {
  button: {
    border_radius: string | undefined
    background_color: string | undefined
    color: string | undefined
    border_color: string | undefined
    border: string | undefined
  }
  font_size: string | undefined
  font_weight: string | undefined
  hover_text: string | undefined
  hover_background_color: string | undefined
  background_color: string | undefined
  color: string | undefined
  currency: string
  banner_checkout_left: string
  banner_checkout_right: string
  url_media_backend: string
  prefix_url_media: string
  national_flags_image: string
  country_code: string
  mask_input_phone: string
  place_holder_country: string
  image_country_input: string
}
export interface ConfigAction {
  type: string
  config: IConfigApp
}

export type DispatchType = (args: ConfigAction) => ConfigAction
