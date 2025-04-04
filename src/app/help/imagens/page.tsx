"use client";

import React from "react";
import HelpLayout from "@/shared/infra/presentation/components/HelpLayout";

export default function ImagesHelpPage() {
  return (
    <HelpLayout>
      <div className="overflow-y-auto">
        <section id="register" className="mb-3">
          <h2 className="text-lg font-semi-bold text-gray-900 mb-1">Cadastrar imagens</h2>
          <p className="text-gray-700 mb-1">
            Para cadastrar novas imagens no sistema, siga os passos abaixo:
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-gray-700">
            <li>Acesse o sistema com suas credenciais</li>
            <li>No menu lateral, clique em &quot;Imagens&quot;</li>
            <li>Selecione a opção &quot;Adicionar Imagem&quot;</li>
            <li>Preencha todos os campos obrigatórios do formulário:
              <ul className="list-disc list-inside ml-2 mt-0.5">
                <li>Título da imagem</li>
                <li>Descrição</li>
                <li>Categoria</li>
                <li>Tags (opcional)</li>
              </ul>
            </li>
            <li>Clique no botão &quot;Selecionar arquivo&quot; para escolher a imagem</li>
            <li>Clique em &quot;Enviar&quot; para finalizar o cadastro</li>
          </ol>
        </section>

        <section id="edit" className="mb-3">
          <h2 className="text-lg font-semi-bold text-gray-900 mb-1">Editar imagens</h2>
          <p className="text-gray-700 mb-1">
            Para editar uma imagem existente:
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-gray-700">
            <li>Acesse o sistema com suas credenciais</li>
            <li>No menu lateral, clique em &quot;Imagens&quot;</li>
            <li>Selecione a opção &quot;Banco de Imagens&quot;</li>
            <li>Localize a imagem que deseja editar</li>
            <li>Clique no ícone de lápis (editar) na linha correspondente</li>
            <li>Faça as alterações necessárias no formulário</li>
            <li>Clique em &quot;Salvar alterações&quot;</li>
          </ol>
        </section>

        <section id="delete" className="mb-3">
          <h2 className="text-lg font-semi-bold text-gray-900 mb-1">Excluir imagens</h2>
          <p className="text-gray-700 mb-1">
            Para excluir uma imagem do sistema:
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-gray-700">
            <li>Acesse o sistema com suas credenciais</li>
            <li>No menu lateral, clique em &quot;Imagens&quot;</li>
            <li>Selecione a opção &quot;Banco de Imagens&quot;</li>
            <li>Localize a imagem que deseja excluir</li>
            <li>Clique no ícone de três pontos para abrir o menu de opções</li>
            <li>Selecione a opção &quot;Excluir&quot;</li>
            <li>Confirme a exclusão na caixa de diálogo que aparecerá</li>
          </ol>
          <p className="text-gray-700 mt-0.5">
            <strong>Atenção:</strong> A exclusão de imagens é permanente e não pode ser desfeita. 
            Certifique-se de que realmente deseja excluir a imagem antes de confirmar.
          </p>
        </section>

        <section id="search" className="mb-3">
          <h2 className="text-lg font-semi-bold text-gray-900 mb-1">Buscar imagens</h2>
          <p className="text-gray-700 mb-1">
            Para buscar imagens no sistema:
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-gray-700">
            <li>Acesse o sistema com suas credenciais</li>
            <li>No menu lateral, clique em &quot;Imagens&quot;</li>
            <li>Selecione a opção &quot;Banco de Imagens&quot;</li>
            <li>Utilize a barra de pesquisa localizada na parte superior da página</li>
            <li>Digite palavras-chave relacionadas à imagem que deseja encontrar</li>
            <li>Pressione Enter ou clique no ícone de lupa para iniciar a busca</li>
          </ol>
          <p className="text-gray-700 mt-0.5">
            Você também pode filtrar as imagens por:
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-gray-700 ml-2">
            <li>Categoria</li>
            <li>Data de upload</li>
            <li>Usuário que realizou o upload</li>
            <li>Tags</li>
          </ul>
        </section>
      </div>
    </HelpLayout>
  );
} 