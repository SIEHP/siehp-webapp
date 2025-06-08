"use client";

import { AdminPagesHeader } from "../../../../../../../shared/infra/presentation/components/AdminPagesHeader";
import { CustomTable } from "../../../../../../../shared/infra/presentation/components/CustomTable";
import { AddPeopleIcon } from "../../../../../../../shared/infra/presentation/components/Icons";
import { useState } from "react";
import { Modal } from "@/shared/infra/presentation/components/ModalRegistration";

const ProfessorsPage = ({}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      {/* exemplo, remover quando dor fazer integração */}
      <Modal isOpen={open} onClose={handleCloseModal}></Modal>
      <AdminPagesHeader.Root>
        <AdminPagesHeader.Title>Professores</AdminPagesHeader.Title>
        <AdminPagesHeader.Body>
          <AdminPagesHeader.ButtonContent>
            <AdminPagesHeader.ButtonIcon>
              <AddPeopleIcon className={`[&>path]:fill-gray-900-tk`} />
            </AdminPagesHeader.ButtonIcon>
            <AdminPagesHeader.Button onClick={handleOpenModal}>
              Adicionar Professor
            </AdminPagesHeader.Button>
          </AdminPagesHeader.ButtonContent>
          <AdminPagesHeader.Filter />
        </AdminPagesHeader.Body>
      </AdminPagesHeader.Root>
      {/* exemplo, remover quando dor fazer integração */}
      <CustomTable.Root>
        <CustomTable.Header>
          <CustomTable.Row>
            <CustomTable.Head className="min-w-[175px] ">
              Matrícula
            </CustomTable.Head>
            <CustomTable.Head className="min-w-[250px] max-w-[250px]">
              Nome do Professor
            </CustomTable.Head>
            <CustomTable.Head className="min-w-[250px] max-w-[250px]">
              Departamento
            </CustomTable.Head>
            <CustomTable.Head className="w-[180px]">
              Estado do Professor
            </CustomTable.Head>
          </CustomTable.Row>
        </CustomTable.Header>
        <CustomTable.Body>
          <CustomTable.Row>
            <CustomTable.Cell className="ml-[30px] mr-[50px] min-w-[175px]">
              202100012345
            </CustomTable.Cell>
            <CustomTable.Cell className="mr-[45px] min-w-[250px] max-w-[250px]">
              ANA CAROLINA GUIMARAES FALEIROS
            </CustomTable.Cell>
            <CustomTable.Cell className="mr-[45px] min-w-[250px] max-w-[250px]">
              Morfologia
            </CustomTable.Cell>
            <CustomTable.CellStatus
              status="ACTIVE"
              className="mr-[125px] max-w-[100px]"
            >
              Ativo
            </CustomTable.CellStatus>
            <CustomTable.CellButton>Ver Turmas</CustomTable.CellButton>
            <CustomTable.CellMenu />
          </CustomTable.Row>
        </CustomTable.Body>
      </CustomTable.Root>
    </>
  );
};

export default ProfessorsPage;
