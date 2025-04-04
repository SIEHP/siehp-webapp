"use client";

import React from "react";
import HelpLayout from "@/shared/infra/presentation/components/HelpLayout";

export default function LoginHelpPage() {
  return (
    <HelpLayout>
      <div className="overflow-y-auto">
        <section id="access" className="mb-3">
          <h2 className="text-lg font-semi-bold text-gray-900 mb-1">Como acessar o sistema</h2>
          <p className="text-gray-700 mb-1">
            Para acessar o SIEHP, abra seu navegador e acesse o endereço oficial do sistema. 
            Na página inicial, você encontrará o formulário de login.
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-gray-700">
            <li>Acesse o site oficial do SIEHP</li>
            <li>Localize o formulário de login na página inicial</li>
            <li>Insira suas credenciais (usuário e senha)</li>
            <li>Clique no botão &quot;Entrar&quot;</li>
          </ol>
        </section>

        <section id="credentials" className="mb-3">
          <h2 className="text-lg font-semi-bold text-gray-900 mb-1">Credenciais de acesso</h2>
          <p className="text-gray-700 mb-1">
            As credenciais de acesso ao sistema são fornecidas pelo administrador. 
            Caso você não possua credenciais, entre em contato com a administração do sistema.
          </p>
          <p className="text-gray-700">
            Durante o primeiro acesso, o sistema solicitará a alteração da senha temporária.
          </p>
        </section>

        <section id="recovery" className="mb-3">
          <h2 className="text-lg font-semi-bold text-gray-900 mb-1">Recuperação de senha</h2>
          <p className="text-gray-700 mb-1">
            Caso tenha esquecido sua senha, utilize a opção &quot;Esqueci minha senha&quot; 
            disponível na tela de login.
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-gray-700">
            <li>Na tela de login, clique em &quot;Esqueci minha senha&quot;</li>
            <li>Informe o e-mail cadastrado no sistema</li>
            <li>Verifique sua caixa de entrada para instruções de redefinição</li>
            <li>Siga o link enviado para criar uma nova senha</li>
          </ol>
        </section>
      </div>
    </HelpLayout>
  );
} 