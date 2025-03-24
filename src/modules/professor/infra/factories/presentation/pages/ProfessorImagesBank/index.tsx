"use client";

import { AdminPagesHeader } from "@/shared/infra/presentation/components/AdminPagesHeader";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";
import { useState, ChangeEvent } from "react";

const ProfessorImagesBankPage = ({}) => {
  // Estados para cada campo de filtro
  const [direitosImagem, setDireitosImagem] = useState("");
  const [tecidoOrgao, setTecidoOrgao] = useState("");
  const [estadoPeca, setEstadoPeca] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Estado para forçar a recriação dos componentes
  const [resetKey, setResetKey] = useState(0);

  // Função para limpar todos os filtros
  const limparFiltros = () => {
    // Resetar estados
    setDireitosImagem("");
    setTecidoOrgao("");
    setEstadoPeca("");
    setDataCadastro("");
    setTags([]);

    // Incrementar o resetKey para forçar a recriação dos componentes
    setResetKey((prev) => prev + 1);
  };

  // Manipuladores de eventos
  const handleDireitosImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDireitosImagem(e.target.value);
  };

  const handleTecidoOrgaoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTecidoOrgao(e.target.value);
  };

  const handleEstadoPecaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEstadoPeca(e.target.value);
  };

  const handleDataCadastroChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataCadastro(e.target.value);
  };

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
            <CustomDataField.Text
              key={`direitos-imagem-${resetKey}`}
              className="sm:w-[260px] md:w-[300px]"
              onChange={handleDireitosImagemChange}
              defaultValue=""
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Tecido/Orgão: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text
              key={`tecido-orgao-${resetKey}`}
              className="sm:w-[260px] md:w-[300px]"
              onChange={handleTecidoOrgaoChange}
              defaultValue=""
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Estado da Peça: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text
              key={`estado-peca-${resetKey}`}
              className="sm:w-[260px] md:w-[300px]"
              onChange={handleEstadoPecaChange}
              defaultValue=""
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Data de cadastro:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Date
              key={`data-cadastro-${resetKey}`}
              className="sm:w-[260px] md:w-[300px]"
              onChange={handleDataCadastroChange}
              defaultValue=""
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Tags:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Tag
              key={`tags-${resetKey}`}
              className="w-full"
              initialTags={tags}
              onTagsChange={setTags}
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-1 sm:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
        <button className="bg-fail" onClick={limparFiltros}>
          Limpar filtros
        </button>
        <button className="bg-sucess" onClick={() => {}}>
          Filtrar imagens
        </button>
      </div>
    </div>
  );
};

export default ProfessorImagesBankPage;
