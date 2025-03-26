import { PageInterface } from "../types";



export const checkPermissions = (permissions: string[], userPermissions: string[]) => {
  return permissions.some((permission) => userPermissions.includes(permission));
};

export const checkPagePermissions = (page: PageInterface, userPermissions: string[]) => {
  if (!page.someNeededPermissions) {
    return true;
  }

  return checkPermissions(page.someNeededPermissions, userPermissions);
};