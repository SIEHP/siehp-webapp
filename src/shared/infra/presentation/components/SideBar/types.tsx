import { HTMLAttributes, ReactNode } from "react";
import { PageInterface } from "@/shared/infra/utils/types";

export interface SideBarRootProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export interface SideBarItemProps extends HTMLAttributes<HTMLDivElement> {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
    title: string
    subItems: PageInterface[]
}

export interface SideBarItemContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export interface SideBarFooterProps extends HTMLAttributes<HTMLDivElement> {
    userName: string
    userRole: string
}