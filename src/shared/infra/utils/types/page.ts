export interface PageInterface {
  label: string;
  link: string;
  everyNeededPermissions?: string[];
  someNeededPermissions?: string[];
}

export enum PagesEnum {
  HOME_PAGE = "HOME_PAGE",
  HELP = "HELP",
  ADMIN = "ADMIN"
}
