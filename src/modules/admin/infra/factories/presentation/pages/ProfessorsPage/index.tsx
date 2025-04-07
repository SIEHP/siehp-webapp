"use client";

import { AdminPagesHeader } from "../../../../../../../shared/infra/presentation/components/AdminPagesHeader";
import { CustomTable } from "../../../../../../../shared/infra/presentation/components/CustomTable";
import { AddPeopleIcon } from "../../../../../../../shared/infra/presentation/components/Icons";
import { useState, useEffect } from "react";
import { AdminProfessorRegistrationModal } from "@/shared/infra/presentation/components/AdminProfessorRegistrationModal";
import useAdmin from "@/modules/user/infra/services/hooks/useAdmin";
import { GetProfessorsResponseDTO } from "@/modules/user/domain/dtos/get-professors";

const ProfessorsPage = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [professors, setProfessors] = useState<GetProfessorsResponseDTO>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getProfessors } = useAdmin();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleGetProfessors = async () => {
    try {
      setLoading(true);
      const response = await getProfessors.handleGetProfessors();
      setProfessors(response);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProfessors();
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleGetProfessors(); // Recarregar lista após fechar o modal
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'desc' ? 'asc' : 'desc';
    }
    
    setSortConfig({ key, direction });
    
    setProfessors(prevProfessors => {
      const sortedProfessors = [...prevProfessors];
      sortedProfessors.sort((a, b) => {
        const aValue = a[key as keyof typeof a];
        const bValue = b[key as keyof typeof b];
        
        if (direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      return sortedProfessors;
    });
  };

  return (
    <div className="flex h-full flex-col">
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
      <div className="flex-1 p-4 overflow-auto">
        <CustomTable.Root className="w-full min-w-[1000px]">
          <CustomTable.Header>
            <CustomTable.Row className="md:justify-between">
              <CustomTable.Head 
                className="w-[200px] md:w-[15%]" 
                hasFilter 
                onSort={() => handleSort('registration_code')} 
                sortDirection={sortConfig?.key === 'registration_code' ? sortConfig.direction : null}
                isActiveSort={sortConfig?.key === 'registration_code'}
              >
                Matrícula
              </CustomTable.Head>
              <CustomTable.Head 
                className="w-[300px] md:w-[25%]" 
                hasFilter 
                onSort={() => handleSort('name')} 
                sortDirection={sortConfig?.key === 'name' ? sortConfig.direction : null}
                isActiveSort={sortConfig?.key === 'name'}
              >
                Nome do Professor
              </CustomTable.Head>
              <CustomTable.Head 
                className="w-[300px] md:w-[25%]" 
                hasFilter 
                onSort={() => handleSort('email')} 
                sortDirection={sortConfig?.key === 'email' ? sortConfig.direction : null}
                isActiveSort={sortConfig?.key === 'email'}
              >
                Email
              </CustomTable.Head>
              <CustomTable.Head className="w-[200px] md:w-[15%]">
                Estado do Professor
              </CustomTable.Head>
              <CustomTable.Head className="w-[50px] md:w-[5%]">{" "}</CustomTable.Head>
            </CustomTable.Row>
          </CustomTable.Header>
          <CustomTable.Body>
            {loading ? (
              <CustomTable.Row className="md:justify-between">
                <CustomTable.Cell colSpan={6}>Carregando...</CustomTable.Cell>
              </CustomTable.Row>
            ) : professors.length > 0 ? (
              professors.map((professor) => (
                <CustomTable.Row key={professor.id} className="md:justify-between">
                  <CustomTable.Cell>
                    {professor.registration_code}
                  </CustomTable.Cell>
                  <CustomTable.Cell>
                    {professor.name}
                  </CustomTable.Cell>
                  <CustomTable.Cell>
                    {professor.email}
                  </CustomTable.Cell>
                  <CustomTable.CellStatus
                    status={professor.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
                  >
                    {professor.status === "ACTIVE" ? "Ativo" : "Inativo"}
                  </CustomTable.CellStatus>
                  <CustomTable.CellMenu />
                </CustomTable.Row>
              ))
            ) : (
              <CustomTable.Row className="md:justify-between">
                <CustomTable.Cell colSpan={6}>Nenhum professor encontrado</CustomTable.Cell>
              </CustomTable.Row>
            )}
          </CustomTable.Body>
        </CustomTable.Root>
      </div>
    </div>
  );
};

export default ProfessorsPage;
