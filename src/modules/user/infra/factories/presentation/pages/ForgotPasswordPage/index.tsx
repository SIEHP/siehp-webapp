"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";

const ForgotPasswordPage = () => {
  return (
    <main className="flex flex-grow items-center justify-center bg-gray-100-tk">
      <div className="relative max-w-[512px] rounded-lg bg-gray-300-tk px-2 py-2">
        <Form.Root className="flex flex-col items-center gap-1 [&>div.grid]:gap-1">
          <fieldset className="max-w-[277px] text-center text-md lg:text-lg font-semi-bold text-gray-900-tk">
            Insira seu e-mail para recuperar senha
          </fieldset>
          <small className="block text-sm font-light text-warning">
              *Campos Obrigatóios
          </small>
          <Form.Field className="grid w-full" name="email">
            <Form.Label
              className="text-left text-md lg:text-lg font-semi-bold text-gray-900-tk"
              htmlFor="email"
            >
              E-mail<span className="font-semi-bold text-warning">*</span>
            </Form.Label>
            <div className="relative">
              <Form.Control asChild>
                <input
                  id="email"
                  className="w-[100%] rounded px-0.75 text-sm lg:text-md h-[45px]"
                  type="email"
                  required
                  placeholder="Insira seu e-mail"
                />
              </Form.Control>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="typeMismatch"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail válido
              </Form.Message>
              <Form.Message
                className="relative w-max text-right text-sm lg:text-md text-fail"
                match="valueMissing"
                style={{ bottom: 0, right: 0 }}
              >
                Por favor, insira um e-mail
              </Form.Message>
            </div>
          </Form.Field>
          <p className="font-semibold text-center text-lg leading-tight text-gray-900-tk">
            Após clicar em “Recuperar Senha” verifique seu email.
          </p>
          <Form.Submit asChild>
            <button className="flex max-h-[64px] w-[100%] max-w-[267px] items-center justify-center rounded bg-gray-900-tk py-1 text-md lg:text-lg font-semi-bold text-gray-300-tk">
              Recuperar Senha
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
