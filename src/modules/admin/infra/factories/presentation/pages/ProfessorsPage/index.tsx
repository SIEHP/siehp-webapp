"use client";

import { AdminPagesHeader } from "../../../../../../../shared/infra/presentation/components/AdminPagesHeader";
import { CustomTable } from "../../../../../../../shared/infra/presentation/components/CustomTable";
import { AddPeopleIcon } from "../../../../../../../shared/infra/presentation/components/Icons";
import { useState } from "react";
import { AdminProfessorRegistrationModal } from "@/shared/infra/presentation/components/AdminProfessorRegistrationModal";

const ProfessorsPage = ({}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* exemplo, remover quando dor fazer integração */}
      <AdminProfessorRegistrationModal isOpen={open} onClose={handleCloseModal}></AdminProfessorRegistrationModal>
      <AdminPagesHeader.Root className="pt-4 pl-4 pr-4 md:gap-0 gap-1 items-start flex-col md:flex-row flex">
        <AdminPagesHeader.Title >Professores</AdminPagesHeader.Title>
        <AdminPagesHeader.Body className="flex flex-col md:flex-row md:ml-auto gap-1 items-start md:items-center">
            <AdminPagesHeader.ButtonContent>
              <AdminPagesHeader.Button onClick={handleOpenModal} className="flex items-center gap-0.5">
                <AddPeopleIcon className={`[&>path]:fill-gray-100-tk`} />
                Adicionar Professor
              </AdminPagesHeader.Button>
            </AdminPagesHeader.ButtonContent>
            <AdminPagesHeader.Filter />
        </AdminPagesHeader.Body>
      </AdminPagesHeader.Root>
      {/* exemplo, remover quando dor fazer integração */}
      <div className="flex-1 p-4 overflow-auto">
        <CustomTable.Root className="w-full min-w-[1000px]">
          <CustomTable.Header>
            <CustomTable.Row className="md:justify-between">
              <CustomTable.Head className="w-[200px] md:w-[15%]" hasFilter>
                Matrícula
              </CustomTable.Head>
              <CustomTable.Head className="w-[300px] md:w-[25%]" hasFilter>
                Nome do Professor
              </CustomTable.Head>
              <CustomTable.Head className="w-[300px] md:w-[25%]" hasFilter>
                Departamento
              </CustomTable.Head>
              <CustomTable.Head className="w-[200px] md:w-[15%]">
                Estado do Professor
              </CustomTable.Head>
              <CustomTable.Head className="w-[150px] md:w-[15%]">
                Ações
              </CustomTable.Head>
              <CustomTable.Head className="w-[50px] md:w-[5%]">{" "}</CustomTable.Head>
            </CustomTable.Row>
          </CustomTable.Header>
          <CustomTable.Body>
            <CustomTable.Row className="md:justify-between">
              <CustomTable.Cell>
                202100012345
              </CustomTable.Cell>
              <CustomTable.Cell>
                Professor 1
              </CustomTable.Cell>
              <CustomTable.Cell>
                Morfologia
              </CustomTable.Cell>
              <CustomTable.CellStatus
                status="ACTIVE"
              >
                Ativo
              </CustomTable.CellStatus>
              <CustomTable.CellButton>
                Ver Turmas
              </CustomTable.CellButton>
              <CustomTable.CellMenu />
            </CustomTable.Row>
          </CustomTable.Body>
        </CustomTable.Root>
      </div>
    </div>
  );
};

export default ProfessorsPage;
