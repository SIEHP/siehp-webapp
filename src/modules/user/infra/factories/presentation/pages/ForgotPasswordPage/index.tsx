"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

const ForgotPasswordPage = () => {
  return (
    <main className="flex flex-grow items-center justify-center bg-gray-100-tk px-2 py-2">
      <div className="relative max-w-[512px] rounded-lg bg-[#474747] p-[32px]">
        <Form.Root className="flex flex-col items-center gap-1.5 [&>div.grid]:gap-0.5">
          <fieldset className="max-w-[277px] text-center text-lg font-semi-bold leading-[26px] text-gray-900-tk">
            Insira seu e-mail para recuperar senha
            <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
            </small>
          </fieldset>
          <Form.Field className="grid w-full" name="email">
            <Form.Label
              className="text-left text-lg font-semi-bold text-gray-900-tk"
              htmlFor="email"
            >
              E-mail<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative pb-0.5">
              <Form.Control asChild>
                <input
                  id="email"
                  className="w-[100%] rounded px-[10px] py-[6px] text-md"
                  type="email"
                  required
                  placeholder="Insira seu e-mail"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail válido
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-md text-fail"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail
              </Form.Message>
            </div>
          </Form.Field>
          <p className="font-semibold text-center text-lg leading-tight text-[#f8f8f8]">
            Após clicar em “Recuperar Senha” verifique seu email.
          </p>
          <Form.Submit asChild>
            <button className="mt-1 flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-lg font-semi-bold text-[#474747]">
              Recuperar Senha
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
