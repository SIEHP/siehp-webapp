"use client";

import { SideBar } from "@/shared/infra/presentation/components";
import { GearIcon, ImageIcon } from "../../components/Icons";
import React from "react";
import { AuthenticatedLayoutProps } from "./types";
import { PAGES } from "@/shared/infra/utils/constants";
import { useAuth } from "@/modules/user/infra/services/hooks/useAuth";
import { checkPagePermissions } from "@/shared/infra/utils/functions/check-permissions";
const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { auth } = useAuth();
  const subItemsAdmin = [PAGES.MANAGE_PROFESSORS].filter((page) => checkPagePermissions(page, auth?.user.permissions ?? []));
  const subItemsImage = [PAGES.ADD_IMAGE, PAGES.IMAGES_BANK].filter((page) => checkPagePermissions(page, auth?.user.permissions ?? []));

  return (
    <>
      <div className="flex h-dvh w-dvw flex-row relative">
        <SideBar.Root>
          <SideBar.Logo />
          <SideBar.ItemContainer>
            <SideBar.Item
              title="Gerenciar"
              Icon={GearIcon}
              subItems={subItemsAdmin}
            />
            <SideBar.Item
              title="Imagens"
              Icon={ImageIcon}
              subItems={subItemsImage}
            />
          </SideBar.ItemContainer>
          <SideBar.Footer
            userName={auth?.user.name ?? ""}
            userRole={auth?.user.role ?? ""}
          />
        </SideBar.Root>
        <div className="h-full w-full">{children}</div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
