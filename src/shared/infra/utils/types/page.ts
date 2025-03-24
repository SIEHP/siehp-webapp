export interface PageInterface {
  label: string;
  link: string;
  everyNeededPermissions?: string[];
  someNeededPermissions?: string[];
}

export enum PagesEnum {
  HOME_PAGE = "HOME_PAGE",
  HELP = "HELP",
  ADMIN = "ADMIN",
  ADD_IMAGE = "ADD_IMAGE",
  IMAGES_BANK = "IMAGES_BANK",
}
