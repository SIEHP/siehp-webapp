"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpLayoutProps, HelpPageItem } from "./types";

// Help page sidebar navigation items
export const HELP_PAGES: HelpPageItem[] = [
  {
    id: "login",
    title: "Iniciar Sessão",
    href: "/help/iniciar-sessao",
    sections: [
      { id: "access", title: "Como acessar o sistema" },
      { id: "credentials", title: "Credenciais de acesso" },
      { id: "recovery", title: "Recuperação de senha" }
    ]
  },
  {
    id: "images",
    title: "Imagens",
    href: "/help/imagens",
    sections: [
      { id: "register", title: "Cadastrar imagens" },
      { id: "edit", title: "Editar imagens" },
      { id: "delete", title: "Excluir imagens" },
      { id: "search", title: "Buscar imagens" }
    ]
  }
];

const HelpLayout = ({ children }: HelpLayoutProps) => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(HELP_PAGES[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Set active page based on current path
  useEffect(() => {
    const currentPage = HELP_PAGES.find(
      page => pathname === page.href
    ) || HELP_PAGES[0];
    setActivePage(currentPage);
  }, [pathname]);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex w-full flex-grow">
      {/* Mobile navigation toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed right-2 top-8 z-5 rounded-md bg-gray-700-tk p-0.5 text-white"
      >
        <svg
          className="h-2 w-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isSidebarOpen ? (
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

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 bg-gray-300-tk bg-opacity-75 z-4 transition-opacity md:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-gray-900-tk p-0.25 shadow-lg z-5 transform transition-transform md:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          <div className="grid grid-cols-2 gap-0.25">
            <div className="p-0.5">
              <h3 className="text-md font-semi-bold text-gray-100-tk mb-1">Páginas</h3>
              <ul className="space-y-0.25">
                {HELP_PAGES.map((page) => (
                  <li key={page.id}>
                    <Link 
                      href={page.href}
                      className={`block text-sm py-0.5 px-0.5 rounded ${
                        pathname === page.href ? 'bg-gray-700-tk text-gray-100-tk' : 'text-gray-300-tk hover:bg-gray-700-tk'
                      }`}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-0.5">
              <h3 className="text-md font-semi-bold text-gray-100-tk mb-1">Mapa da Página</h3>
              <ul className="space-y-0.25">
                {activePage.sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="block w-full text-left text-sm py-0.5 px-0.5 rounded text-gray-300-tk hover:bg-gray-700-tk"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[250px] max-h-[calc(100vh-196px)] overflow-y-auto bg-gray-900-tk p-1">
        <h2 className="text-xl font-bold text-gray-100-tk mb-2">Ajuda</h2>
        <ul className="flex flex-col gap-0.5">
          {HELP_PAGES.map((page) => (
            <li key={page.id}>
              <Link 
                href={page.href}
                className={`block py-0.5 px-1 rounded text-${
                  pathname === page.href ? 'gray-900-tk' : 'gray-100-tk'
                } ${pathname === page.href ? 'bg-gray-300-tk' : 'hover:bg-gray-500-tk'}`}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 max-h-[calc(100vh-196px)] overflow-y-auto bg-gray-900-tk p-1">
        <div className="max-w-5xl mx-auto bg-white shadow-sm rounded p-1">
          <h1 className="text-xl font-bold text-gray-100-tk mb-2">{activePage.title}</h1>
          <div>
            {children}
          </div>
        </div>
      </div>

      {/* Page map sidebar */}
      <aside className="hidden md:block w-[220px] max-h-[calc(100vh-196px)] overflow-y-auto bg-gray-900-tk p-1">
        <h2 className="text-lg font-semi-bold text-gray-100-tk mb-1">Nesta Página</h2>
        <ul className="space-y-0.25">
          {activePage.sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="block w-full text-left py-0.5 px-0.5 rounded text-gray-300-tk hover:bg-gray-700-tk"
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default HelpLayout; 