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
}
export interface ConfigAction {
  type: string
  config: IConfigApp
}

export type DispatchType = (args: ConfigAction) => ConfigAction
