"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

const TokenValidationPage = () => {
  return (
    <main className="gap flex flex-grow flex-wrap items-center justify-center gap-4 bg-gray-100-tk px-2 py-2">
      <div className="max-h-[400px] max-w-[512px] h-[100%] w-[100%] rounded-[8px] bg-gray-300-tk px-2 py-3">
        <Form.Root className="flex flex-col gap-1 [&>button]:my-1 items-center justify-center">
          <fieldset className="mx-auto mb-1 max-w-[320px] text-center sm:text-lg text-md font-semi-bold leading-[26px] text-gray-900-tk">
            Insira seu código de autenticação
            <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
            </small>
          </fieldset>
          <Form.Field className="grid w-[100%]" name="codigo">
            <Form.Label
              className="text-left sm:text-lg text-md font-semi-bold text-gray-900-tk pb-1"
              htmlFor="codigo"
            >
              Código<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="codigo"
                  className="h-[50px] w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="codigo"
                  required
                  placeholder="Insira seu código"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-md text-fail opacity-[0.8]"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Código inválido
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-md text-fail opacity-[0.8]"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Digite um código completo
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Submit asChild>
            <button className="flex justify-center max-h-[66px] max-w-[240px] items-center rounded bg-gray-900-tk p-0.75 sm:text-lg text-md font-semi-bold text-gray-100-tk">
              Continuar Cadastro
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  );
};

export default TokenValidationPage;
