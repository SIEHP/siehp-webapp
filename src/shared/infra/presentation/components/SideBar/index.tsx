import { usePathname } from "next/navigation";
import siehpLogo from "@/shared/infra/presentation/assets/images/complete_siehp_logo.png";
import {
  SideBarRootProps,
  SideBarItemProps,
  SideBarFooterProps,
  SideBarItemContainerProps,
} from "./types";
import { Collapsible } from "../Collapsible";
import { ChevronArrowIcon } from "../Icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { UserIcon, LogoutIcon } from "../Icons";

const SideBarRoot = ({ children }: SideBarRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white fixed left-1 top-1 z-20 rounded-md bg-gray-700 p-0.5 lg:hidden"
      >
        <svg
          className="h-2 w-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      <aside
        className={`absolute left-0 top-0 z-10 flex h-dvh max-h-dvh min-w-[380px] flex-col items-center justify-between bg-gray-700 pt-4 transition-all lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </aside>
    </>
  );
};

const SideBarLogo = () => {
  return (
    <div className="w-full px-3">
      <Image
        priority
        className="w-full"
        src={siehpLogo.src}
        alt="Siehp Logo"
        width={siehpLogo.width}
        height={siehpLogo.height}
      />
    </div>
  );
};

const SideBarItemContainer = ({ children }: SideBarItemContainerProps) => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-2.5 overflow-y-auto px-3 py-4">
      {children}
    </div>
  );
};

const SideBarItem = ({ Icon, title, subItems }: SideBarItemProps) => {
  const pathname = usePathname();

  const activeSubItem = subItems.find((item) => pathname === item.link);

  return (
    <Collapsible.Root className="w-full">
      <Collapsible.Trigger className='flex items-center justify-start gap-1 [&[data-state="closed"]>svg:last-child]:-mt-0.5 [&[data-state="closed"]>svg:last-child]:rotate-180'>
        <Icon
          className={`[&>path]:fill-gray-${activeSubItem ? "900" : "700"}-tk`}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        />
        <p
          className={`text-lg font-semi-bold text-gray-${activeSubItem ? "900" : "700"}-tk`}
        >
          {title}
        </p>
        <ChevronArrowIcon
          className={`transition ease-in-out [&>path]:stroke-gray-${activeSubItem ? "900" : "700"}-tk`}
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="pt-1 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        <ul className="flex list-inside list-disc flex-col items-start justify-start gap-1 text-gray-700-tk marker:text-lg marker:text-gray-300">
          {subItems.map((item) => {
            return (
              <li
                className={`indent-2 transition-all ease-in-out hover:pl-1`}
                key={item.link}
              >
                <Link
                  className={`text-lg font-semi-bold text-gray-${activeSubItem === item ? "900" : "700"}-tk`}
                  href={item.link}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

const SideBarFooter = ({ userName, userRole }: SideBarFooterProps) => {
  return (
    <div
      className={`flex w-full flex-col gap-2 p-2 shadow-[rgba(0,_0,_0,_0.25)_0px_-0.5rem_0.5rem_0px]`}
    >
      <div className="flex items-center justify-start gap-1">
        <div>
          <UserIcon className="h-[100px] w-[100px]" />
        </div>
        <div className="text-gray-900-tk">
          <p className="text-lg font-semi-bold">{userName}</p>
          <p className="text-md font-regular">{userRole}</p>
        </div>
      </div>

      <div className="flex items-center justify-start">
        <button
          className="flex items-center justify-center gap-0.5 rounded-md bg-fail p-0.5"
          onClick={() => {}}
        >
          <LogoutIcon className="h-[24px] w-[24px]  text-gray-900-tk" />
          <p className="text-md font-semi-bold text-gray-900-tk">Sair</p>
        </button>
        {/* <Link href="#" className="text-lg font-semi-bold text-gray-700-tk">
          Ajuda
        </Link> */}
      </div>
    </div>
  );
};

export const SideBar = {
  Root: SideBarRoot,
  Logo: SideBarLogo,
  ItemContainer: SideBarItemContainer,
  Item: SideBarItem,
  Footer: SideBarFooter,
};
