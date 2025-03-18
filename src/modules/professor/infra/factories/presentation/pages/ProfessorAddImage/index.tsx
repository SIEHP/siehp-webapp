"use client";

import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";

const ProfessorAddImagePage = ({}) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 p-4 text-lg">
      <div className="h-1/3 min-w-full rounded-lg bg-gray-500-tk text-center">
        (Visualizador de Imagem)
      </div>
      <h1 className="text-md font-semi-bold text-gray-100-tk md:text-lg">
        Insira os dados da imagem
      </h1>
      <div className="flex w-full flex-wrap justify-between gap-1 md:[&>*]:w-[300px]">
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Direitos de imagem: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="w-full" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Tecido/Orgão: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="w-full" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Estado da Peça: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="w-full" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Data de cadastro:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Date className="w-full" />
          </CustomDataField.Content>
        </CustomDataField.Root>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-1 md:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk text-md">
        <button className="bg-fail">Limpar dados</button>
        <button className="bg-sucess">Concluir cadastro</button>
      </div>
    </div>
  );
};

export default ProfessorAddImagePage;
