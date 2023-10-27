import { MegaMenu, MegaMenuAction } from "@interfaces/redux/megaMenu";

export const SET_MEGA_MENU: string = "SET_MEGA_MENU";

export const setMegaMenu = (megaMenu: MegaMenu) => {
  const action: MegaMenuAction = {
    type: SET_MEGA_MENU,
    megaMenu,
  };
  return action;
};
