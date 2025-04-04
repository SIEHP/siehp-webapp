import { ReactNode } from "react";

export interface HelpPageSection {
  id: string;
  title: string;
}

export interface HelpPageItem {
  id: string;
  title: string;
  href: string;
  sections: HelpPageSection[];
}

export interface HelpLayoutProps {
  children: ReactNode;
} 