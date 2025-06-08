import { PageInterface, PagesEnum } from "../types";

export const PAGES: {
  [key in PagesEnum]: PageInterface;
} = {
  HOME_PAGE: {
    label: "Home",
    link: "/",
  },
  HELP: {
    label: "Ajuda",
    link: "/help",
  },
  ADMIN: {
    label: "Administração",
    link: "/admin",
  },
};

export const LANDING_PAGE_NAVBAR_LINKS: (keyof typeof PagesEnum)[] = [
  // "HELP",
  // "HOME_PAGE",
];
