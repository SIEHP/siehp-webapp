"use client"

import Image from "next/image";
import completeSIEHPLogoImg from "@/shared/infra/presentation/assets/images/complete_siehp_logo.png";
import {
  LANDING_PAGE_NAVBAR_LINKS,
  PAGES,
} from "@/shared/infra/utils/constants";
import Link from "next/link";
import { PagesEnum } from "@/shared/infra/utils/types";
import { useState } from "react";

const Header = () => {
  const navbarLinkKeys = Object.keys(PAGES).filter((page) => {
    return LANDING_PAGE_NAVBAR_LINKS.includes(page as PagesEnum);
  }) as PagesEnum[];

  const navbarLinks = navbarLinkKeys.map((link) => {
    return PAGES[link];
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex flex-row items-center justify-between gap-3 bg-gray-700 px-[32px] py-1.5">
      <Link href={PAGES.HOME_PAGE.link}>
        <Image
          priority
          src={completeSIEHPLogoImg.src}
          alt="SIEHP. Sistema Integrado de Ensino à Histologia e Patologia. Logo completo."
          height={completeSIEHPLogoImg.height}
          width={completeSIEHPLogoImg.width}
        />
      </Link>
      <nav className="flex items-center">
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/" className="text-gray-900-tk text-lg font-semi-bold hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-900-tk text-lg font-semi-bold hover:text-gray-300">
              Fale Conosco
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-900-tk text-lg font-semi-bold hover:text-gray-300">
              Sobre Nós
            </Link>
          </li>
        </ul>
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-900-tk focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-3 h-3"
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <ul className="md:hidden flex flex-col space-y-2 absolute top-[105px] left-[0] w-full bg-gray-700 z-10">
          <li className="px-[16px] py-[8px] m-[0]">
            <Link href="/" className="text-gray-900-tk text-md font-semi-bold hover:text-gray-300 hover:0 7px 20px 5px #fff">
              Home
            </Link>
          </li>
          <li className="px-[16px] py-[8px] m-[0]">
            <Link href="#" className="text-gray-900-tk text-md font-semi-bold hover:text-gray-300">
              Fale Conosco
            </Link>
          </li>
          <li className="px-[16px] py-[8px] mb-[25px]">
            <Link href="#" className="text-gray-900-tk text-md font-semi-bold hover:text-gray-300">
              Sobre Nós
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
