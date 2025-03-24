"use client";

import { SideBar } from "@/shared/infra/presentation/components";
import { GearIcon, ImageIcon } from "../../components/Icons";
import React from "react";
import { AuthenticatedLayoutProps } from "./types";
import { PAGES } from "@/shared/infra/utils/constants";

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <>
      <div className="flex h-dvh w-dvw flex-row relative">
        <SideBar.Root>
          <SideBar.Logo />
          <SideBar.ItemContainer>
            <SideBar.Item
              title="Admin"
              Icon={GearIcon}
              subItems={[PAGES.HELP, PAGES.HOME_PAGE, PAGES.ADMIN]}
            />
            <SideBar.Item
              title="Imagens"
              Icon={ImageIcon}
              subItems={[PAGES.ADD_IMAGE, PAGES.IMAGES_BANK]}
            />
          </SideBar.ItemContainer>
          <SideBar.Footer
            userName={"Ciclano Cleberson"}
            userRole={"Professor"}
          />
        </SideBar.Root>
        <div className="h-full w-full">{children}</div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
