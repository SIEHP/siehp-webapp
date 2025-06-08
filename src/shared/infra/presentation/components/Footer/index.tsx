import { PAGES } from "@/shared/infra/utils/constants";
import Image from "next/image";
import Link from "next/link";
import completeSIEHPLogoImg from "@/shared/infra/presentation/assets/images/complete_siehp_logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse items-center justify-between gap-x-3 gap-y-2 bg-gray-700 px-2 py-1.5 sm:flex-row md:px-4">
      <p className="text-sm font-light text-gray-100">
        Sistema Integrado de Ensino à Histologia e Patologia 2024 © Todos os
        direitos reservados.
      </p>
      <Link href={PAGES.HOME_PAGE.link} className="flex-shrink-0">
        <Image
          src={completeSIEHPLogoImg.src}
          alt="SIEHP. Sistema Integrado de Ensino à Histologia e Patologia. Logo completo."
          height={35}
          width={134}
        />
      </Link>
    </footer>
  );
};

export default Footer;
