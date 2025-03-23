"use client";

import { AdminPagesHeader } from "@/shared/infra/presentation/components/AdminPagesHeader";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";
import dividerImg from "@/shared/infra/presentation/assets/images/divider.svg";
import Image from "next/image";

const ProfessorImagesBankPage = ({}) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-1 p-4">
      <AdminPagesHeader.Root className="w-full">
        <AdminPagesHeader.Title>Filtros:</AdminPagesHeader.Title>
        <AdminPagesHeader.Body>
          <AdminPagesHeader.Filter />
        </AdminPagesHeader.Body>
      </AdminPagesHeader.Root>
      <div className="flex w-full flex-wrap justify-between gap-1">
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Direitos de imagem: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Tecido/Orgão: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Estado da Peça: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Data de cadastro:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Date className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Tags:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Tag className="w-full" />
          </CustomDataField.Content>
        </CustomDataField.Root>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-1 sm:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
        <button className="bg-fail">Limpar filtros</button>
        <button className="bg-sucess">Filtrar imagens</button>
      </div>
    </div>
  );
};

export default ProfessorImagesBankPage;
