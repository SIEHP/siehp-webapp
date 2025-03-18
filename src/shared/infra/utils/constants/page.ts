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
  ADD_IMAGE: {
    label: "Adicionar Imagem",
    link: "/professor/addImage",
  },
  IMAGES_BANK: {
    label: "Banco de Imagens",
    link: "/professor/imagesBank",
  },
};

export const LANDING_PAGE_NAVBAR_LINKS: (keyof typeof PagesEnum)[] = [
  // "HELP",
  // "HOME_PAGE",
  // "ADD_IMAGES",
];
