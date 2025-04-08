"use client";

import { AdminPagesHeader } from "../../../../../../../shared/infra/presentation/components/AdminPagesHeader";
import { CustomTable } from "../../../../../../../shared/infra/presentation/components/CustomTable";
import { AddPeopleIcon, ThreeDotsIcon } from "../../../../../../../shared/infra/presentation/components/Icons";
import { useState, useEffect, useRef, useCallback } from "react";
import { AdminProfessorRegistrationModal } from "@/shared/infra/presentation/components/AdminProfessorRegistrationModal";
import useAdmin from "@/modules/user/infra/services/hooks/useAdmin";
import { GetProfessorsResponseDTO } from "@/modules/user/domain/dtos/get-professors";
import { AlertDialog } from "@/shared/infra/presentation/components/AlertDialog";
import { useToastStore } from "@/shared/infra/services/hooks/useToast";

const ProfessorsPage = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [professors, setProfessors] = useState<GetProfessorsResponseDTO>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getProfessors, changeUserStatus } = useAdmin();
  const { toast } = useToastStore();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const [isStatusChangeDialogOpen, setIsStatusChangeDialogOpen] = useState<boolean>(false);
  const [selectedProfessorId, setSelectedProfessorId] = useState<number | null>(null);
  const [selectedProfessorStatus, setSelectedProfessorStatus] = useState<string | null>(null);
  const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Removendo a única referência e usando um callback ref
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Função para buscar professores
  const fetchProfessors = async () => {
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

  // Carregar professores apenas uma vez ao montar o componente
  useEffect(() => {
    fetchProfessors();
  }, []); // Sem dependências para executar apenas uma vez

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica se o clique foi fora de qualquer dropdown aberto
      if (isDropdownOpen !== null) {
        const currentDropdownRef = dropdownRefs.current[isDropdownOpen];
        if (currentDropdownRef && !currentDropdownRef.contains(event.target as Node)) {
          setIsDropdownOpen(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Função para registrar a ref de um dropdown
  const setDropdownRef = useCallback((element: HTMLDivElement | null, id: number) => {
    dropdownRefs.current[id] = element;
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    fetchProfessors(); // Recarregar lista após fechar o modal
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

  const handleMoreClick = (e: React.MouseEvent, professorId: number) => {
    e.stopPropagation();
    setIsDropdownOpen(prev => prev === professorId ? null : professorId);
  };

  const handleChangeStatusClick = (professorId: number, status: string) => {
    setIsDropdownOpen(null);
    setSelectedProfessorId(professorId);
    setSelectedProfessorStatus(status);
    setIsStatusChangeDialogOpen(true);
  };

  const handleChangeStatusConfirm = async () => {
    if (!selectedProfessorId) {
      setError("ID do professor não encontrado");
      return;
    }

    setIsChangingStatus(true);
    setError(null);

    try {
      const params = { userId: selectedProfessorId };
      
      // Adicionando try/catch específico para a chamada da API
      try {
        await changeUserStatus.handleChangeUserStatus(params);
        
        // Exibe toast de sucesso com a mensagem apropriada
        const acao = selectedProfessorStatus === "ACTIVE" ? "desativado" : "ativado";
        toast.success(`Professor foi ${acao} com sucesso!`);
      } catch (apiError) {
        throw apiError; // Re-throw para ser capturado pelo catch externo
      }
      
      // Fechar o diálogo
      setIsStatusChangeDialogOpen(false);
      
      // Atualizar a lista de professores diretamente
      await fetchProfessors();
    } catch (err: any) {
      setError(err?.message || "Erro ao alterar status do professor. Tente novamente.");
      // Exibe toast de erro
      const acao = selectedProfessorStatus === "ACTIVE" ? "desativar" : "ativar";
      toast.error(`Erro ao ${acao} o professor: ${err?.message || "Falha na operação"}`);
    } finally {
      setIsChangingStatus(false);
    }
  };

  return (
    <div className="flex h-full flex-col p-2">
      <AdminProfessorRegistrationModal isOpen={open} onClose={handleCloseModal}></AdminProfessorRegistrationModal>
      <AdminPagesHeader.Root className="md:gap-0 gap-1 items-start flex-col md:flex-row flex">
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
      <div className="flex-1 overflow-auto py-2">
        <CustomTable.Root className="w-full min-w-[800px]">
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
                  <CustomTable.Cell className="relative">
                    <div ref={(el) => setDropdownRef(el, professor.id)}>
                      <button
                        onClick={(e) => handleMoreClick(e, professor.id)}
                        className="inline-flex items-center justify-center hover:bg-gray-100 rounded-full p-1"
                        title="Mais opções"
                      >
                        <ThreeDotsIcon width={16} height={16} />
                      </button>
                      
                      {/* Dropdown menu */}
                      {isDropdownOpen === professor.id && (
                        <div className="absolute right-0 w-36 rounded-md shadow-lg bg-gray-500-tk z-10">
                          <button
                            onClick={() => handleChangeStatusClick(professor.id, professor.status)}
                            className="w-full px-1 py-0.5 text-sm text-left text-gray-900-tk hover:bg-gray-400-tk"
                          >
                            {professor.status === "ACTIVE" ? "Desativar" : "Ativar"}
                          </button>
                        </div>
                      )}
                    </div>
                  </CustomTable.Cell>
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

      {/* Diálogo de confirmação de alteração de status */}
      <AlertDialog.Root open={isStatusChangeDialogOpen} onOpenChange={setIsStatusChangeDialogOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Confirmar alteração de status</AlertDialog.Title>
            <AlertDialog.Description className="text-gray-100-tk">
              Tem certeza que deseja alterar o status deste professor? Esta ação pode ser desfeita posteriormente.
            </AlertDialog.Description>
            {error && (
              <div className="mt-1 text-red-500 text-sm">{error}</div>
            )}
            <div className="flex justify-between gap-2 mt-1">
              <AlertDialog.Cancel asChild>
                <button 
                  className="px-1 py-1 rounded-md bg-fail text-gray-100-tk hover:bg-gray-400-tk font-regular"
                  disabled={isChangingStatus}
                >
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button 
                  className="px-1 py-1 rounded-md bg-sucess text-gray-100-tk hover:bg-opacity-90 font-regular"
                  onClick={handleChangeStatusConfirm}
                  disabled={isChangingStatus}
                >
                  {isChangingStatus ? "Alterando..." : "Confirmar"}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default ProfessorsPage;
