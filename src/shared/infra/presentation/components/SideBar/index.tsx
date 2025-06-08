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

const SideBarRoot = ({ children }: SideBarRootProps) => {
  return (
    <aside
      className={`fixed left-0 top-0 z-10 flex h-full w-[380px] flex-col items-center justify-between bg-gray-700 pt-4`}
    >
      {children}
    </aside>
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
          className={`[&>path]:fill-gray-${activeSubItem ? "100" : "300"}`}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        />
        <p
          className={`text-lg font-semi-bold text-gray-${activeSubItem ? "100" : "300"}`}
        >
          {title}
        </p>
        <ChevronArrowIcon
          className={`transition ease-in-out [&>path]:stroke-gray-${activeSubItem ? "100" : "300"}`}
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp pt-1">
        <ul className="flex list-inside list-disc flex-col items-start justify-start gap-1 marker:text-lg marker:text-gray-300">
          {subItems.map((item) => {
            return (
              <li
                className={`indent-3 transition-all ease-in-out hover:pl-1`}
                key={item.link}
              >
                <Link
                  className={`text-lg font-semi-bold text-gray-${activeSubItem === item ? "100" : "300"}`}
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
      className={`w-full p-3 pb-3 shadow-[rgba(0,_0,_0,_0.25)_0px_-0.5rem_0.5rem_0px]`}
    >
      {userName}
      {userRole}
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
