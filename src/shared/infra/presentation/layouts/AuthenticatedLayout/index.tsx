"use client";

import { SideBar } from "@/shared/infra/presentation/components";
import { GearIcon } from "../../components/Icons";
import React from "react";
import { AuthenticatedLayoutProps } from "./types";
import { PAGES } from "@/shared/infra/utils/constants";

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <>
      <SideBar.Root>
        <SideBar.Logo />
        <SideBar.ItemContainer>
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE, PAGES.ADMIN]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
          <SideBar.Item
            title="Admin"
            Icon={GearIcon}
            subItems={[PAGES.HELP, PAGES.HOME_PAGE]}
          />
        </SideBar.ItemContainer>
        <SideBar.Footer userName={"fulano"} userRole={"pica"} />
      </SideBar.Root>
      <div className="ml-[380px]">
      {children}
      </div>
      
    </>
  );
};

export default AuthenticatedLayout;
