export interface PageInterface {
  label: string;
  link: string;
  someNeededPermissions?: string[];
}

export enum PagesEnum {
  HOME_PAGE = "HOME_PAGE",
  HELP = "HELP",
  MANAGE_PROFESSORS = "MANAGE_PROFESSORS",
  ADD_IMAGE = "ADD_IMAGE",
  IMAGES_BANK = "IMAGES_BANK",
}
