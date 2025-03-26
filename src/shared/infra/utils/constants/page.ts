import { PageInterface, PagesEnum } from "../types";

export const PAGES: {
  [key in PagesEnum]: PageInterface;
} = {
  HOME_PAGE: {
    label: "Home",
    link: "/",
    someNeededPermissions: [],
  },
  HELP: {
    label: "Ajuda",
    link: "/help",
    someNeededPermissions: [],
  },
  MANAGE_PROFESSORS: {
    label: "Gerenciar Professores",
    link: "/admin/professores",
    someNeededPermissions: ["MANTER_PROFESSORES"],
  },
  ADD_IMAGE: {
    label: "Adicionar Imagem",
    link: "/professor/addImage",
    someNeededPermissions: ["MANTER_IMAGENS"],
  },
  IMAGES_BANK: {
    label: "Banco de Imagens",
    link: "/professor/imagesBank",
    someNeededPermissions: ["ACESSAR_IMAGENS"],
  },
};

export const LANDING_PAGE_NAVBAR_LINKS: (keyof typeof PagesEnum)[] = [
  "HELP",
  "HOME_PAGE",
  "ADD_IMAGE",
  "IMAGES_BANK",
];
